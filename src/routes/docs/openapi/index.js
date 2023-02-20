// Import plugins
const cors = require("@fastify/cors");

const { docsOpenapiGetSchema } = require("./schema");

const accepts = docsOpenapiGetSchema.produces;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
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
			methods: ["GET", "HEAD"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: docsOpenapiGetSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (_req, res) => {
			res.header("cache-control", "public, max-age=1800")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control")
				.send(server.swagger());
		},
	});
}

module.exports = route;
