"use strict";

const { parse: cfbParse } = require("cfb");

// Import plugins
const cors = require("@fastify/cors");
const docToTxt = require("../../../plugins/doc-to-txt");

const { docToTxtPostSchema } = require("./schema");

// Cache response media types so not having to navigate schema object each time
const ACCEPTS = Object.keys(docToTxtPostSchema.response[200].content);

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
		docToTxtPostSchema.security = [{ bearerToken: [] }];
		docToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		docToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			if (payload.length === 0) {
				throw server.httpErrors.badRequest("Body cannot be empty");
			}

			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks the file is actually a DOC file.
			 * DOC files use the Compound File Binary Format (CFBF), which the
			 * file-type package does not support; use cfb instead.
			 */
			try {
				const results = cfbParse(payload);
				// Check the CFBF file is a DOC file by looking for the WordDocument stream
				if (
					!results?.FileIndex.find(
						(file) => file.name === "WordDocument"
					)
				) {
					throw new Error();
				}
			} catch {
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
		.register(docToTxt);

	server.route({
		method: "POST",
		url: "/",
		schema: docToTxtPostSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(ACCEPTS)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: async (req, res) => {
			res.type("text/plain; charset=utf-8");
			return server.docToTxt(req.body);
		},
	});
}

module.exports = route;
