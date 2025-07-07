"use strict";

const isHtml = require("is-html");

// Import plugins
const cors = require("@fastify/cors");

const { htmlToTxtPostSchema } = require("./schema");

// Cache response media types so not having to navigate schema object each time
const ACCEPTS = Object.keys(htmlToTxtPostSchema.response[200].content);

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
		htmlToTxtPostSchema.security = [{ bearerToken: [] }];
		htmlToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		htmlToTxtPostSchema.consumes,
		{ parseAs: "string" },
		async (_req, payload) => {
			if (payload === "") {
				throw server.httpErrors.badRequest("Body cannot be empty");
			}

			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks the payload is HTML.
			 */
			if (!isHtml(payload)) {
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
		});

	server.route({
		method: "POST",
		url: "/",
		schema: htmlToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(ACCEPTS)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req, res) => {
			const tidiedHtml = await server.tidyHtml(req.body, {
				removeHidden: req.query.extract_hidden !== true,
			});

			res.type("text/plain; charset=utf-8");
			return server.htmlToTxt(tidiedHtml);
		},
	});
}

module.exports = route;
