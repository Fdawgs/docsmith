const path = require("upath");

// Import plugins
const staticPlugin = require("fastify-static");

const { docsGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 */
async function route(server) {
	// Register plugins
	server
		// Allow for static files to be served from this dir via `sendFile`
		.register(staticPlugin, { root: __dirname, serve: false })

		// Register redoc module to allow for js to be used in docs.html
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
			prefix: "/redoc/",
			decorateReply: false,
			maxAge: "1 day",
		});

	server.route({
		method: "GET",
		url: "/",
		schema: docsGetSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(docsGetSchema.produces)
			) {
				throw res.notAcceptable();
			}
		},
		handler: (req, res) => {
			res.header("cache-control", "private, max-age=180")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control")
				.type("text/html; charset=utf-8")
				.sendFile("index.html");
		},
	});
}

module.exports = route;
