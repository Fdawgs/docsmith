// Import plugins
const cors = require("@fastify/cors");

const { healthcheckGetSchema } = require("./schema");

const accepts = ["text/plain"];

/**
 * @author Frazer Smith
 * @description Sets routing options for server for healthcheck endpoint.
 * Monitoring software polls this to confirm the API is running,
 * so needs no authentication.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET", "HEAD"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: healthcheckGetSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (_req, res) => {
			res.send("ok");
		},
	});
}

module.exports = route;
