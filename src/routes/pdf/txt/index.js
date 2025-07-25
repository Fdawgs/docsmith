"use strict";

const { fromBuffer } = require("file-type");

// Import plugins
const cors = require("@fastify/cors");
const pdfToTxt = require("../../../plugins/pdf-to-txt");

const { pdfToTxtPostSchema } = require("./schema");

// Cache response media types so not having to navigate schema object each time
const ACCEPTS = Object.keys(pdfToTxtPostSchema.response[200].content);

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*} [options.bearerTokenAuthKeys] - Apply `bearerToken` security scheme to route if defined.
 * @param {import("@fastify/cors").FastifyCorsOptions} options.cors - CORS settings.
 * @param {object} options.poppler - PDF-to-TXT plugin settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		pdfToTxtPostSchema.security = [{ bearerToken: [] }];
		pdfToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		pdfToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			if (payload.length === 0) {
				throw server.httpErrors.badRequest("Body cannot be empty");
			}

			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for PDF specific magic numbers.
			 */
			const results = await fromBuffer(payload);
			if (!pdfToTxtPostSchema.consumes.includes(results?.mime)) {
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
		.register(pdfToTxt, options.poppler);

	server.route({
		method: "POST",
		url: "/",
		schema: pdfToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(ACCEPTS)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req) =>
			req.query.bounding_box_xhtml ||
			req.query.bounding_box_xhtml_layout ||
			req.query.generate_html_meta_file
				? server.tidyHtml(req.conversionResults.body)
				: req.conversionResults.body,
	});
}

module.exports = route;
