"use strict";

// Import plugins
const cors = require("@fastify/cors");

const { docsOpenapiGetSchema } = require("./schema");

// Cache supported media types so not having to navigate schema object each time
const accepts = docsOpenapiGetSchema.produces;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {import("@fastify/cors").FastifyCorsOptions} options.cors - CORS settings.
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
