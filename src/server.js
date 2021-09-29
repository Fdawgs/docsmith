const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("path");

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
 * @param {Function} server - Fastify instance.
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
		.register(helmet, config.helmet);

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	server
		// Re-usable schemas
		.register(sharedSchemas)

		// Utility functions and error handlers
		.register(sensible)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// Generate OpenAPI/Swagger schemas
		.register(swagger, config.swagger)

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.join(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		.register(embedHtmlImages, config.poppler)
		.register(tidyCss)
		.register(tidyHtml);

	if (config.tesseract.enabled === true) {
		server.register(imageToTxt, config.tesseract);
	}

	server
		// Ensure rate limit also applies to 4xx and 5xx responses
		.addHook("onSend", server.rateLimit())

		/*
		 * `x-xss-protection` and `content-security-policy` is set by default.
		 * These are only useful for HTML/XML content; the only CSP directive that
		 * is of use to other content is "frame-ancestors 'none'" to stop responses
		 * from being wrapped in iframes.
		 */
		.addHook("onSend", async (req, res) => {
			if (
				!res.getHeader("content-type").startsWith("text/html") &&
				!res.getHeader("content-type").startsWith("image/svg")
			) {
				res.raw.setHeader(
					"content-security-policy",
					"default-src 'self';frame-ancestors 'none'"
				);
				res.raw.removeHeader("x-xss-protection");
			}
			return res;
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
					dir: path.join(__dirname, "routes"),
					ignorePattern: /(admin|docs)/,
					options: config,
				});
		})

		/**
		 * Encapsulate the docs routes into a child context, so that the
		 * CSP can be relaxed without impacting security of other routes
		 */
		.register(async (publicContext) => {
			const relaxedHelmetConfig = JSON.parse(
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
				.register(helmet, relaxedHelmetConfig)
				// Register static files in ./src/public
				.register(staticPlugin, {
					root: path.join(__dirname, "public"),
				})

				// Register redoc module to allow for js to be used in ./src/public/docs.html
				.register(staticPlugin, {
					root: path.join(
						__dirname,
						"..",
						"node_modules",
						"redoc",
						"bundles"
					),
					prefix: "/redoc/",
					decorateReply: false,
				})
				.register(autoLoad, {
					dir: path.join(__dirname, "routes", "docs"),
					options: { ...config, prefix: "docs" },
				});
		});
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });
