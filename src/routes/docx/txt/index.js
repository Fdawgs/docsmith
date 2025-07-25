"use strict";

const { fromBuffer } = require("file-type");
const { htmlToText } = require("html-to-text");

// Import plugins
const cors = require("@fastify/cors");
const docxToHtml = require("../../../plugins/docx-to-html");

const { docxToTxtPostSchema } = require("./schema");

// Cache response media types so not having to navigate schema object each time
const ACCEPTS = Object.keys(docxToTxtPostSchema.response[200].content);

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*} [options.bearerTokenAuthKeys] - Apply `bearerToken` security scheme to route if defined.
 * @param {import("@fastify/cors").FastifyCorsOptions} options.cors - CORS settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		docxToTxtPostSchema.security = [{ bearerToken: [] }];
		docxToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		docxToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			if (payload.length === 0) {
				throw server.httpErrors.badRequest("Body cannot be empty");
			}

			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks for DOCX specific magic numbers.
			 */
			const results = await fromBuffer(payload);
			if (!docxToTxtPostSchema.consumes.includes(results?.mime)) {
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
		.register(docxToHtml);

	server.route({
		method: "POST",
		url: "/",
		schema: docxToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(ACCEPTS)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req, res) => {
			const html = await server.docxToHtml(req.body);

			res.type("text/plain; charset=utf-8");
			return htmlToText(html, {
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
			}).trim();
		},
	});
}

module.exports = route;
