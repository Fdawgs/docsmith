"use strict";

const { fromBuffer } = require("file-type");

// Import plugins
const cors = require("@fastify/cors");
const docxToHtml = require("../../../plugins/docx-to-html");

const { docxToHtmlPostSchema } = require("./schema");

// Cache supported media types so not having to navigate schema object each time
const accepts = Object.keys(docxToHtmlPostSchema.response[200].content);

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
		docxToHtmlPostSchema.security = [{ bearerToken: [] }];
		docxToHtmlPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		docxToHtmlPostSchema.consumes,
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
			if (!docxToHtmlPostSchema.consumes.includes(results?.mime)) {
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
		schema: docxToHtmlPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req, res) => {
			const html = await server.docxToHtml(req.body);
			const tidiedHtml = await server.tidyHtml(html, {
				language: req.query.language,
				removeAlt: req.query.removeAlt,
			});

			res.type("text/html; charset=utf-8");
			return server.tidyCss(tidiedHtml, {
				fonts: req.query.fonts,
				backgroundColor: req.query.backgroundColor,
			});
		},
	});
}

module.exports = route;
