const { fromBuffer } = require("file-type");

// Import plugins
const cors = require("@fastify/cors");
const pdfToTxt = require("../../../plugins/pdf-to-txt");

const { pdfToTxtPostSchema } = require("./schema");

const accepts = ["text/plain", "text/html"];

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.poppler - PDF-to-TXT plugin settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		pdfToTxtPostSchema.security = [{ bearerToken: [] }];
	}

	server.addContentTypeParser(
		"application/pdf",
		{ parseAs: "buffer" },
		async (req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for PDF specific magic numbers.
			 */
			const results = await fromBuffer(payload);
			if (
				results === undefined ||
				results.mime === undefined ||
				results.mime !== "application/pdf"
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
		.register(pdfToTxt, options.poppler);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req) => {
			let result;
			if (
				req.query.boundingBoxXhtml ||
				req.query.boundingBoxXhtmlLayout ||
				req.query.generateHtmlMetaFile
			) {
				result = await server.tidyHtml(req.conversionResults.body);
			} else {
				result = req.conversionResults.body;
			}
			return result;
		},
	});
}

module.exports = route;
