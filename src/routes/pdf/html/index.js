const { UnsupportedMediaType } = require("http-errors");
const fileType = require("file-type");

// Import plugins
const pdfToHtml = require("../../../plugins/pdf-to-html");

const { pdfToHtmlPostSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.addContentTypeParser(
		"application/pdf",
		{ parseAs: "buffer" },
		async (req, payload) => {
			try {
				/**
				 * The Content-Type header can be spoofed so is not trusted implicitly,
				 * this checks for PDF specific magic numbers.
				 */
				const { mime } = await fileType.fromBuffer(payload);
				if (mime === "application/pdf") {
					return payload;
				}
				throw UnsupportedMediaType();
			} catch (err) {
				throw UnsupportedMediaType();
			}
		}
	);

	server.register(pdfToHtml, options);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToHtmlPostSchema,
		async handler(req, res) {
			const result = server.tidyCss(
				await server.tidyHtml(
					server.embedHtmlImages(req.pdfToHtmlResults.body, true)
				)
			);

			res.send(result);
		},
	});
}

module.exports = route;
