const { UnsupportedMediaType } = require("http-errors");
const fileType = require("file-type");

// Import plugins
const cors = require("fastify-cors");
const pdfToTxt = require("../../../plugins/pdf-to-txt");

const { pdfToTxtPostSchema } = require("./schema");

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

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, { ...options.cors, methods: ["POST"] });

	server.register(pdfToTxt, options);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToTxtPostSchema,
		async handler(req, res) {
			const result = req.pdfToTxtResults.body;
			res.send(result);
		},
	});
}

module.exports = route;
