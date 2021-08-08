const { NotAcceptable, UnsupportedMediaType } = require("http-errors");
const fileType = require("file-type");

// Import plugins
const cors = require("fastify-cors");
const docxToHtml = require("../../../plugins/docx-to-html");

const { docxToHtmlPostSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		docxToHtmlPostSchema.security = [{ bearerToken: [] }];
	}

	server.addHook("onRequest", async (req, res) => {
		if (
			// Catch unsupported Accept header media types
			!docxToHtmlPostSchema.produces.includes(
				req.accepts().type(docxToHtmlPostSchema.produces)
			)
		) {
			res.send(NotAcceptable());
		}
	});

	server.addContentTypeParser(
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		{ parseAs: "buffer" },
		async (req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for DOCX specific magic numbers.
			 */
			const results = await fileType.fromBuffer(payload);
			if (
				results === undefined ||
				results.mime === undefined ||
				results.mime !==
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
		.register(docxToHtml);

	server.route({
		method: "POST",
		url: "/",
		schema: docxToHtmlPostSchema,
		async handler(req, res) {
			const result = await server.tidyHtml(req.conversionResults.body, {
				removeAlt: req.query.removeAlt,
			});

			res.send(result);
		},
	});
}

module.exports = route;
