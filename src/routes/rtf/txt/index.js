const { fromBuffer } = require("file-type");
const { htmlToText } = require("html-to-text");

// Import plugins
const cors = require("@fastify/cors");
const rtfToHtml = require("../../../plugins/rtf-to-html");

const { rtfToTxtPostSchema } = require("./schema");

const accepts = ["text/plain"];

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.unrtf - RTF-to-HTML plugin settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		rtfToTxtPostSchema.security = [{ bearerToken: [] }];
		rtfToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		rtfToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for RTF specific magic numbers
			 */
			const results = await fromBuffer(payload);
			if (!rtfToTxtPostSchema.consumes.includes(results?.mime)) {
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
		/**
		 * rtf-to-html plugin used over old rtf-to-txt plugin
		 * as there was no easy way to detect and remove images
		 * generated by the old plugin from the cwd.
		 * html-to-text module used to convert resulting HTML
		 * to plain text
		 */
		.register(rtfToHtml, {
			...options.unrtf,
			tempFilePrefix: "docsmith_rtf-to-txt",
		});

	server.route({
		method: "POST",
		url: "/",
		schema: rtfToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (req, res) => {
			// RTF-to-HTML plugin sets type to "text/html; charset=utf-8", override that
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
