// Import plugins
const cors = require("@fastify/cors");
const htmlToPdf = require("../../../plugins/html-to-pdf");

const { htmlToPdfPostSchema } = require("./schema");

const accepts = ["text/html"];

/**
 * @author Julian Matthews
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		htmlToPdfPostSchema.security = [{ bearerToken: [] }];
		htmlToPdfPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		"text/html",
		{ parseAs: "buffer" },
		async (_req, payload) => payload
	);

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["POST"],
		})
		.register(htmlToPdf);

	server.route({
		method: "POST",
		url: "/",
		schema: htmlToPdfPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req) => req.conversionResults.body,
	});
}

module.exports = route;
