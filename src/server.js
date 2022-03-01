const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("upath");
const secJSON = require("secure-json-parse");

// Import plugins
const accepts = require("fastify-accepts");
const bearer = require("fastify-bearer-auth");
const compress = require("fastify-compress");
const helmet = require("fastify-helmet");
const disableCache = require("fastify-disablecache");
const flocOff = require("fastify-floc-off");
const rateLimit = require("fastify-rate-limit");
const sensible = require("fastify-sensible");
const staticPlugin = require("fastify-static");
const swagger = require("fastify-swagger");
const underPressure = require("under-pressure");
const sharedSchemas = require("./plugins/shared-schemas");

// Import local decorator plugins
const embedHtmlImages = require("./plugins/embed-html-images");
const imageToTxt = require("./plugins/image-to-txt");
const tidyCss = require("./plugins/tidy-css");
const tidyHtml = require("./plugins/tidy-html");

/**
 * @author Frazer Smith
 * @description Build Fastify instance.
 * @param {object} server - Fastify instance.
 * @param {object} config - Fastify configuration values.
 */
async function plugin(server, config) {
	// Register plugins
	server
		// Accept header handler
		.register(accepts)

		// Support Content-Encoding
		.register(compress, { inflateIfDeflated: true })

		// Opt-out of Google's FLoC advertising-surveillance network
		.register(flocOff)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, config.helmet)

		// Utility functions and error handlers
		.register(sensible, { errorHandler: false })

		// Re-usable schemas
		.register(sharedSchemas)

		// Generate OpenAPI/Swagger schemas
		.register(swagger, config.swagger)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// HTML and CSS parsing plugins used in routes
		.register(embedHtmlImages, config.poppler)
		.register(tidyCss)
		.register(tidyHtml);

	if (config.tesseract.enabled === true) {
		server.register(imageToTxt, config.tesseract);
	}

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	// Register routes
	server
		// Ensure rate limit also applies to 4xx and 5xx responses
		.addHook("onSend", server.rateLimit())

		/*
		 * `x-xss-protection` and `content-security-policy` is set by default by Helmet.
		 * These are only useful for HTML/XML content; the only CSP directive that
		 * is of use to other content is "frame-ancestors 'none'" to stop responses
		 * from being wrapped in iframes and used for clickjacking attacks.
		 */
		.addHook("onSend", async (req, res) => {
			if (
				res.getHeader("content-type") !== undefined &&
				!res.getHeader("content-type")?.includes("html") &&
				!res.getHeader("content-type")?.includes("xml")
			) {
				res.raw.setHeader(
					"content-security-policy",
					"default-src 'self';frame-ancestors 'none'"
				);
				res.raw.removeHeader("x-xss-protection");
			}
			return res;
		})

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.joinSafe(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		/**
		 * Encapsulate plugins and routes into a secured child context, so that admin and
		 * docs routes do not inherit the bearer token auth plugin.
		 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
		 */
		.register(async (securedContext) => {
			securedContext
				// Set response headers to disable client-side caching
				.register(disableCache);

			if (config.bearerTokenAuthKeys) {
				securedContext.register(bearer, {
					keys: config.bearerTokenAuthKeys,
					errorResponse: (err) => ({
						statusCode: 401,
						error: "Unauthorized",
						message: err.message,
					}),
				});
			}

			securedContext
				// Import and register service routes
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes"),
					ignorePattern: /(admin|docs)/,
					options: config,
				});
		})

		/**
		 * Encapsulate the docs routes into a child context, so that the
		 * CSP can be relaxed without impacting security of other routes
		 */
		.register(async (publicContext) => {
			const relaxedHelmetConfig = secJSON.parse(
				JSON.stringify(config.helmet)
			);
			Object.assign(
				relaxedHelmetConfig.contentSecurityPolicy.directives,
				{
					"script-src": ["'self'", "'unsafe-inline'"],
					"style-src": ["'self'", "'unsafe-inline'"],
					"child-src": ["'self'", "blob:"],
				}
			);

			publicContext
				// Set relaxed response headers
				.register(helmet, relaxedHelmetConfig)

				// Register static files in ./src/public
				.register(staticPlugin, {
					root: path.joinSafe(__dirname, "public"),
					immutable: true,
					maxAge: "365 days",
				})
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes", "docs"),
					options: { ...config, prefix: "docs" },
				});
		})

		// Errors thrown by routes and plugins are caught here
		.setErrorHandler(
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			(err, req, res) => {
				/* istanbul ignore if */
				if (res.statusCode >= 500) {
					req.log.error({ req, res, err }, err && err.message);
					res.internalServerError();
				} else {
					req.log.info({ req, res, err }, err && err.message);
					res.send(err);
				}
			}
		);
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });
