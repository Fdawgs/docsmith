const { UnsupportedMediaType } = require("http-errors");
const fileType = require("file-type");

// Import plugins
const cors = require("fastify-cors");
const rtfToHtml = require("../../../plugins/rtf-to-html");

const { rtfToHtmlPostSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.addContentTypeParser(
		"application/rtf",
		{ parseAs: "buffer" },
		async (req, payload) => {
			try {
				/**
				 * The Content-Type header can be spoofed so is not trusted implicitly,
				 * this checks for RTF specific magic numbers.
				 */
				const { mime } = await fileType.fromBuffer(payload);
				if (mime === "application/rtf") {
					return payload;
				}
				throw UnsupportedMediaType();
			} catch (err) {
				throw UnsupportedMediaType();
			}
		}
	);

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["POST"],
		hideOptionsRoute: true,
	});

	server.register(rtfToHtml, options);

	server.route({
		method: "POST",
		url: "/",
		schema: rtfToHtmlPostSchema,
		async handler(req, res) {
			const result = server.tidyCss(
				await server.tidyHtml(
					server.embedHtmlImages(req.rtfToHtmlResults.body, true)
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
