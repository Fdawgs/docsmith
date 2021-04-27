const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("path");

// Import plugins
const bearer = require("fastify-bearer-auth");
const helmet = require("fastify-helmet");
const disableCache = require("fastify-disablecache");
const rateLimit = require("fastify-rate-limit");
const swagger = require("fastify-swagger");
const underPressure = require("under-pressure");

// Import local decorator plugins
const embedHtmlImages = require("./plugins/embed-html-images");
const tidyCss = require("./plugins/tidy-css");
const tidyHtml = require("./plugins/tidy-html");

// Import healthcheck route
const healthCheck = require("./routes/healthcheck");

/**
 * @author Frazer Smith
 * @description Build Fastify instance
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values
 */
async function plugin(server, config) {
	// Register plugins
	server
		.register(disableCache)

		// Process load and 503 response handling
		.register(underPressure, {
			maxEventLoopDelay: 1000,
			maxHeapUsedBytes: 100000000,
			maxRssBytes: 100000000,
			maxEventLoopUtilization: 0.98,
		})

		// Rate limiting and 429 response handling
		.register(rateLimit, {
			allowList: ["127.0.0.1"],
			max: 60,
			timeWindow: 60000,
		})

		.register(swagger, config.swagger)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, (instance) => ({
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					"form-action": ["'self'"],
					"img-src": ["'self'", "data:", "validator.swagger.io"],
					"script-src": ["'self'"].concat(instance.swaggerCSP.script),
					"style-src": ["'self'", "https:"].concat(
						instance.swaggerCSP.style
					),
				},
			},
			referrerPolicy: {
				/**
				 * "no-referrer" will only be used as a fallback if "strict-origin-when-cross-origin"
				 * is not supported by the browser
				 */
				policy: ["no-referrer", "strict-origin-when-cross-origin"],
			},
		}))

		// Basic healthcheck route to ping
		.register(healthCheck)

		.register(embedHtmlImages, config)
		.register(tidyCss)
		.register(tidyHtml)

		/**
		 * Encapsulate plugins and routes into secured child context, so that swagger and
		 * healthcheck routes do not inherit bearer token auth
		 */
		.register(async (securedContext) => {
			securedContext
				.register(bearer, { keys: config.authKeys })
				// Import and register service routes
				.register(autoLoad, {
					dir: path.join(__dirname, "routes"),
					ignorePattern: /healthcheck/,
					options: config,
				});
		});
}

module.exports = fp(plugin);
