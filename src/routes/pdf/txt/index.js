const { NotAcceptable, UnsupportedMediaType } = require("http-errors");
const fileType = require("file-type");

// Import plugins
const cors = require("fastify-cors");
const pdfToTxt = require("../../../plugins/pdf-to-txt");

const { pdfToTxtPostSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.poppler - PDF-to-TXT plugin settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		pdfToTxtPostSchema.security = [{ bearerToken: [] }];
	}

	if (options.tesseract.enabled !== true) {
		delete pdfToTxtPostSchema.query.properties.ocr;
	}

	server.addHook("onRequest", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!pdfToTxtPostSchema.produces.includes(
				req.accepts().type(pdfToTxtPostSchema.produces)
			)
		) {
			res.send(NotAcceptable());
		}
	});

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
				throw UnsupportedMediaType();
			} else {
				return payload;
			}
		}
	);

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server
		.register(cors, {
			...options.cors,
			methods: ["POST"],
			hideOptionsRoute: true,
		})
		.register(pdfToTxt, options.poppler);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToTxtPostSchema,
		async handler(req, res) {
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

			res.send(result);
		},
	});
}

module.exports = route;
