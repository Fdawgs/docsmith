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

		// Set response headers to disable client-side caching
		.register(disableCache)

		// Opt-out of Google's FLoC advertising-surveillance network
		.register(flocOff)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, {
			contentSecurityPolicy: {
				directives: {
					"default-src": ["'self'"],
					"base-uri": ["'self'"],
					"img-src": ["'self'", "data:"],
					"object-src": ["'none'"],
					"child-src": ["'self'"],
					"frame-ancestors": ["'none'"],
					"form-action": ["'self'"],
					"upgrade-insecure-requests": [],
					"block-all-mixed-content": [],
				},
			},
			hsts: {
				maxAge: 31536000,
			},
		})

		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit)

		// Re-usable schemas
		.register(sharedSchemas)

		// Utility functions and error handlers
		.register(sensible)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// Enable Swagger/OpenAPI routes
		.register(swagger, config.swagger)

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.join(__dirname, "routes"),
			ignorePattern: /(docx|pdf|rtf)/,
			options: config,
		})

		.register(embedHtmlImages, config.poppler)
		.register(tidyCss)
		.register(tidyHtml);

	if (config.tesseract.enabled === true) {
		server.register(imageToTxt, config.tesseract);
	}

	/**
	 * Encapsulate plugins and routes into a secured child context, so that swagger and
	 * healthcheck routes do not inherit the bearer token auth plugin.
	 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
	 */
	server.register(async (securedContext) => {
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
				ignorePattern: /admin/,
				options: config,
			});
	});
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });
