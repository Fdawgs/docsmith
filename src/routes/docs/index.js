"use strict";

const { join } = require("node:path");

// Import plugins
const staticPlugin = require("@fastify/static");

const { docsGetSchema } = require("./schema");

// Cache response media types so not having to navigate schema object each time
const ACCEPTS = Object.keys(docsGetSchema.response[200].content);

// Cache immutable regex as they are expensive to create and garbage collect
const PATH_REG = /\/redoc\.standalone\.js(?:.map)?/u;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function route(server) {
	// Register plugins
	await server
		// Allow for static files to be served from this dir via `sendFile`
		.register(staticPlugin, {
			root: __dirname,
			serve: false,
			cacheControl: false,
		})

		// Register redoc module to allow for standalone js and map to be used in docs.html
		.register(staticPlugin, {
			root: join(__dirname, "../../../node_modules/redoc/bundles"),
			allowedPath: (pathName) => pathName.match(PATH_REG) !== null,
			decorateReply: false,
			maxAge: "1 day",
			prefix: "/redoc/",
		});

	server.route({
		method: "GET",
		url: "/",
		schema: docsGetSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(ACCEPTS)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (_req, res) => {
			res.header("cache-control", "public, max-age=300")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control")
				.sendFile("index.html");
		},
	});
}

module.exports = route;
