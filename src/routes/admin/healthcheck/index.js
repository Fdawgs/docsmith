// Import plugins
const cors = require("@fastify/cors");

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
	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: healthcheckGetSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(healthcheckGetSchema.produces)
			) {
				return res.notAcceptable();
			}

			return req;
		},
		handler: (req, res) => {
			res.send("ok");
		},
	});
}

module.exports = route;
