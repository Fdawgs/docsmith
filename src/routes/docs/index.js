const { docsGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 */
async function route(server) {
	server.addHook("preValidation", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!docsGetSchema.produces.includes(
				req.accepts().type(docsGetSchema.produces)
			)
		) {
			throw res.notAcceptable();
		}
	});

	server.route({
		method: "GET",
		url: "/",
		schema: docsGetSchema,
		handler(req, res) {
			res.header("cache-control", "private, max-age=180");
			res.header("content-type", "text/html; charset=utf-8");
			res.sendFile("docs.html");
		},
	});
}

module.exports = route;
