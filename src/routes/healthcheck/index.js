const { NotAcceptable } = require("http-errors");

// Import plugins
const cors = require("fastify-cors");

const { healthcheckGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server for healthcheck endpoint.
 * This is used by monitoring software to poll and confirm the API is running,
 * so needs no authentication.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	server.addHook("onRequest", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!healthcheckGetSchema.produces.includes(
				req.accepts().type(healthcheckGetSchema.produces)
			)
		) {
			res.send(NotAcceptable());
		}
	});

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET"],
		hideOptionsRoute: true,
	});

	server.route({
		method: "GET",
		url: "/healthcheck",
		schema: healthcheckGetSchema,
		async handler(req, res) {
			res.send("ok");
		},
	});
}

module.exports = route;
