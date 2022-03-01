const fileType = require("file-type");

// Import plugins
const cors = require("fastify-cors");
const pdfToHtml = require("../../../plugins/pdf-to-html");

const { pdfToHtmlPostSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.poppler - PDF-to-HTML plugin settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		pdfToHtmlPostSchema.security = [{ bearerToken: [] }];
	}

	server.addContentTypeParser(
		"application/pdf",
		{ parseAs: "buffer" },
		async (req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for PDF specific magic numbers.
			 */
			const results = await fileType.fromBuffer(payload);
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
	server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["POST"],
		})
		.register(pdfToHtml, options.poppler);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToHtmlPostSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!pdfToHtmlPostSchema.produces.includes(
					req.accepts().type(pdfToHtmlPostSchema.produces)
				)
			) {
				throw res.notAcceptable();
			}
		},
		handler: async (req, res) => {
			const result = server.tidyCss(
				await server.tidyHtml(
					await server.embedHtmlImages(req.conversionResults.body),
					{
						language: req.query.language,
						removeAlt: req.query.removeAlt,
					}
				),
				{
					fonts: req.query.fonts,
					backgroundColor: req.query.backgroundColor,
				}
			);

			res.send(result);
		},
	});
}

module.exports = route;
