const { fromBuffer } = require("file-type");
const { htmlToText } = require("html-to-text");

// Import plugins
const cors = require("@fastify/cors");
const dotxToTxt = require("../../../plugins/docx-to-html");

const { dotxToTxtPostSchema } = require("./schema");

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
		dotxToTxtPostSchema.security = [{ bearerToken: [] }];
		dotxToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		dotxToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for DOCX specific magic numbers as DOCX and DOTX are
			 * identical file formats
			 */
			const results = await fromBuffer(payload);
			if (
				results?.mime !==
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				throw server.httpErrors.unsupportedMediaType();
			}
			return payload;
		}
	);

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["POST"],
		})
		.register(dotxToTxt);

	server.route({
		method: "POST",
		url: "/",
		schema: dotxToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (req, res) => {
			// DOCX-to-HTML plugin sets type to "text/html; charset=utf-8", override that
			res.type("text/plain; charset=utf-8").send(
				htmlToText(req.conversionResults.body, {
					selectors: [
						{ selector: "a", options: { ignoreHref: true } },
						{ selector: "h1", options: { uppercase: false } },
						{ selector: "img", format: "skip" },
						{
							selector: "table",
							format: "dataTable",
							options: { uppercaseHeaderCells: false },
						},
					],
					wordwrap: null,
				}).trim()
			);
		},
	});
}

module.exports = route;
