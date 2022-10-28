const { fromBuffer } = require("file-type");

// Import plugins
const cors = require("@fastify/cors");
const docxToTxt = require("../../../plugins/docx-to-txt");

const { docxToTxtPostSchema } = require("./schema");

const accepts = ["text/plain"];

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
		docxToTxtPostSchema.security = [{ bearerToken: [] }];
	}

	server.addContentTypeParser(
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		{ parseAs: "buffer" },
		async (req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for DOCX specific magic numbers.
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
		.register(docxToTxt);

	server.route({
		method: "POST",
		url: "/",
		schema: docxToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (req, res) => {
			res.send(req.conversionResults.body);
		},
	});
}

module.exports = route;
