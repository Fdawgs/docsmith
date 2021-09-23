// Import plugins
const cors = require("fastify-cors");

const { docsGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	server.addHook("preValidation", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!docsGetSchema.produces.includes(
				req.accepts().type(docsGetSchema.produces)
			)
		) {
			res.notAcceptable();
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
		url: "/",
		schema: docsGetSchema,
		handler(req, res) {
			res.header("content-type", "text/html; charset=utf-8");
			res.sendFile("docs.html");
		},
	});
}

module.exports = route;
