// Import plugins
const cors = require("fastify-cors");
const disableCache = require("fastify-disablecache");

const { healthcheckGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server for healthcheck endpoint.
 * This is used by monitoring software to poll and confirm the API is running,
 * so needs no authentication.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	server.addHook("preValidation", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!healthcheckGetSchema.produces.includes(
				req.accepts().type(healthcheckGetSchema.produces)
			)
		) {
			throw res.notAcceptable();
		}
	});

	// Register plugins
	server
		// Set response headers to disable client-side caching
		.register(disableCache)

		// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
		.register(cors, {
			...options.cors,
			methods: ["GET"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: healthcheckGetSchema,
		handler(req, res) {
			res.send("ok");
		},
	});
}

module.exports = route;
