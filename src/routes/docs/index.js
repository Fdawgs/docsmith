"use strict";

const path = require("upath");

// Import plugins
const staticPlugin = require("@fastify/static");

const { docsGetSchema } = require("./schema");

const accepts = ["text/html"];

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function route(server) {
	// Register plugins
	await server
		// Allow for static files to be served from this dir via `sendFile`
		.register(staticPlugin, { root: __dirname, serve: false })

		// Register redoc module to allow for standalone js and map to be used in docs.html
		.register(staticPlugin, {
			root: path.joinSafe(
				__dirname,
				"..",
				"..",
				"..",
				"node_modules",
				"redoc",
				"bundles"
			),
			allowedPath: (pathName) =>
				pathName.match(/\/redoc\.standalone\.js(?:.map)?/u) !== null,
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
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (_req, res) => {
			res.header("cache-control", "public, max-age=300")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control")
				.type("text/html; charset=utf-8")
				.sendFile("index.html");
		},
	});
}

module.exports = route;
