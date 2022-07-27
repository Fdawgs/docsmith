// Import plugins
const cors = require("@fastify/cors");

const { docsOpenapiGetSchema } = require("./schema");

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
			methods: ["GET"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: docsOpenapiGetSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(docsOpenapiGetSchema.produces)
			) {
				return res.notAcceptable();
			}

			return req;
		},
		handler: async (req, res) => {
			res.header("cache-control", "public, max-age=3600")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control");
			return server.swagger();
		},
	});
}

module.exports = route;
