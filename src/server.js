"use strict";

const autoLoad = require("@fastify/autoload");
const fp = require("fastify-plugin");
const { joinSafe } = require("upath");

// Import plugins
const accepts = require("@fastify/accepts");
const bearer = require("@fastify/bearer-auth");
const compress = require("@fastify/compress");
const cors = require("@fastify/cors");
const helmet = require("@fastify/helmet");
const disableCache = require("fastify-disablecache");
const flocOff = require("fastify-floc-off");
const rateLimit = require("@fastify/rate-limit");
const sensible = require("@fastify/sensible");
const serialiseJsonToXml = require("fastify-json-to-xml");
const staticPlugin = require("@fastify/static");
const swagger = require("@fastify/swagger");
const underPressure = require("@fastify/under-pressure");
const sharedSchemas = require("./plugins/shared-schemas");

// Import local decorator plugins
const embedHtmlImages = require("./plugins/embed-html-images");
const htmlToTxt = require("./plugins/html-to-txt");
const imageToTxt = require("./plugins/image-to-txt");
const tidyCss = require("./plugins/tidy-css");
const tidyHtml = require("./plugins/tidy-html");

/**
 * @author Frazer Smith
 * @description Builds Fastify instance.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {import("./config").Config} config - Server configuration.
 */
async function plugin(server, config) {
	/**
	 * Stop routes from accepting 'application/json' and 'text/plain'
	 * POST/PUT/PATCH requests by removing included default parsers.
	 */
	server.removeAllContentTypeParsers();

	// Register plugins
	await server
		// Accept header handler
		.register(accepts)

		// Support Content-Encoding
		.register(compress, { inflateIfDeflated: true })

		// Set response headers to disable client-side caching
		.register(disableCache)

		// Opt-out of Google's Topics advertising-surveillance API
		.register(flocOff)

		/**
		 * Use Helmet to set response security headers.
		 * @see {@link https://helmetjs.github.io | Helmet}
		 */
		.register(helmet, config.helmet)

		// Utility functions and error handlers
		.register(sensible)

		// Serialisation support for XML responses
		.register(serialiseJsonToXml)

		// Reusable schemas
		.register(sharedSchemas)

		// Generate OpenAPI/Swagger definitions
		.register(swagger, config.swagger)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// HTML and CSS parsing plugins used in routes
		.register(embedHtmlImages, config.poppler)
		.register(htmlToTxt)
		.register(tidyCss)
		.register(tidyHtml);

	if (config.tesseract.enabled === true) {
		await server.register(imageToTxt, config.tesseract);
	}

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	// Register routes
	server
		/**
		 * Helmet sets `x-xss-protection` and `content-security-policy` by default.
		 * These are only useful for HTML/XML content; the only CSP directive that
		 * is of use to other content is "frame-ancestors 'none'" to stop responses
		 * from being wrapped in iframes and used for clickjacking attacks.
		 */
		.addHook("onSend", async (_req, res, payload) => {
			if (
				!res
					.getHeader("content-type")
					?.toString()
					.toLowerCase()
					.includes("html") &&
				!res
					.getHeader("content-type")
					?.toString()
					.toLowerCase()
					.includes("xml")
			) {
				res.header(
					"content-security-policy",
					"default-src 'self';frame-ancestors 'none'"
				);
				res.raw.removeHeader("x-xss-protection");
			}
			return payload;
		})

		// Import and register admin routes
		.register(autoLoad, {
			dir: joinSafe(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		/**
		 * Encapsulate plugins and routes into a secured child context, so that admin and
		 * docs routes do not inherit the bearer token auth plugin.
		 * @see {@link https://fastify.dev/docs/latest/Reference/Encapsulation | Fastify Encapsulation}
		 */
		.register(async (securedContext) => {
			if (config.bearerTokenAuthKeys) {
				await securedContext.register(bearer, {
					// Ensure auth is after CORS onRequest hook to avoid authenticating preflight requests
					addHook: "preParsing",
					keys: config.bearerTokenAuthKeys,
					errorResponse: (err) => ({
						statusCode: 401,
						error: "Unauthorized",
						message: err.message,
					}),
				});
			}

			await securedContext
				// Import and register service routes
				.register(autoLoad, {
					dir: joinSafe(__dirname, "routes"),
					ignorePattern: /(?:admin|docs)/u,
					options: config,
				});
		})

		/**
		 * Encapsulate the docs routes into a child context, so that the
		 * CSP can be relaxed, and cache enabled, without affecting
		 * security of other routes.
		 */
		.register(async (publicContext) => {
			const relaxedHelmetConfig = structuredClone(config.helmet);
			Object.assign(
				relaxedHelmetConfig.contentSecurityPolicy.directives,
				{
					"script-src": ["'self'", "'unsafe-inline'"],
					"style-src": ["'self'", "'unsafe-inline'"],
				}
			);

			await publicContext
				// Set relaxed response headers
				.register(helmet, relaxedHelmetConfig)

				// Stop fastify-disablecache overwriting @fastify/static's cache headers
				.addHook("onRequest", async (_req, res) => {
					res.removeHeader("cache-control")
						.removeHeader("expires")
						.removeHeader("pragma")
						.removeHeader("surrogate-control");
				})

				// Register static files in public
				.register(staticPlugin, {
					root: joinSafe(__dirname, "public"),
					immutable: true,
					maxAge: "365 days",
					prefix: "/public/",
					wildcard: false,
				})
				.register(autoLoad, {
					dir: joinSafe(__dirname, "routes", "docs"),
					options: { ...config, prefix: "docs" },
				});
		})

		/**
		 * Encapsulate the 404 handler into a child context, so that CORS
		 * headers can be set explicitly for 404 responses.
		 */
		.register(async (notFoundContext) => {
			await notFoundContext.register(cors, config.cors);

			notFoundContext.setNotFoundHandler(
				{
					// Rate limit 404 responses to prevent URL enumeration
					preHandler: server.rateLimit(),
				},
				(req, res) => {
					res.notFound(`Route ${req.method}:${req.url} not found`);
				}
			);
		})

		// Errors thrown by routes and plugins are caught here
		// eslint-disable-next-line promise/prefer-await-to-callbacks -- False positive
		.setErrorHandler(async (err, _req, res) => {
			/**
			 * Catch 5xx errors, log them, and return a generic 500
			 * response. This avoids leaking internal server error details
			 * to the client.
			 */
			if (
				(err.statusCode >= 500 && err.statusCode !== 503) ||
				/**
				 * Uncaught errors will have a res.statusCode but not
				 * an err.statusCode as @fastify/sensible sets that.
				 */
				(res.statusCode === 200 && !err.statusCode)
			) {
				res.log.error(err);
				throw server.httpErrors.internalServerError();
			}

			throw err;
		});
}

module.exports = fp(plugin, { fastify: "5.x", name: "server" });
