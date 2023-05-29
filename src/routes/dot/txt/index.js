const cfb = require("cfb");

// Import plugins
const cors = require("@fastify/cors");
const dotToTxt = require("../../../plugins/doc-to-txt");

const { dotToTxtPostSchema } = require("./schema");

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
		dotToTxtPostSchema.security = [{ bearerToken: [] }];
		dotToTxtPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		dotToTxtPostSchema.consumes,
		{ parseAs: "buffer" },
		async (_req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks the file is actually a DOT file.
			 * DOT files use the Compound File Binary Format (CFBF), which the
			 * file-type package does not support; use cfb instead
			 */
			try {
				const results = cfb.parse(payload);
				// Check the CFBF file is a DOT file by looking for the WordDocument stream
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
		.register(dotToTxt);

	server.route({
		method: "POST",
		url: "/",
		schema: dotToTxtPostSchema,
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
