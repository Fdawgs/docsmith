const { fromBuffer } = require("file-type");

// Import plugins
const cors = require("@fastify/cors");
const docxToHtml = require("../../../plugins/docx-to-html");

const { docxToHtmlPostSchema } = require("./schema");

const accepts = ["text/html"];

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		docxToHtmlPostSchema.security = [{ bearerToken: [] }];
		docxToHtmlPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		{ parseAs: "buffer" },
		async (_req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for DOCX specific magic numbers
			 */
			const results = await fromBuffer(payload);
			if (
				results === undefined ||
				results.mime === undefined ||
				results.mime !==
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				throw server.httpErrors.unsupportedMediaType();
			} else {
				return payload;
			}
		}
	);

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["POST"],
		})
		.register(docxToHtml);

	server.route({
		method: "POST",
		url: "/",
		schema: docxToHtmlPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req) => {
			const tidiedHtml = await server.tidyHtml(
				req.conversionResults.body,
				{
					language: req.query.language,
					removeAlt: req.query.removeAlt,
				}
			);

			return server.tidyCss(tidiedHtml, {
				fonts: req.query.fonts,
				backgroundColor: req.query.backgroundColor,
			});
		},
	});
}

module.exports = route;
