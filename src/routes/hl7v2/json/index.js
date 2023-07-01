// Import plugins
const cors = require("@fastify/cors");
const hl7v2ToJson = require("../../../plugins/hl7v2-to-json");

const { hl7v2ToJsonPostSchema } = require("./schema");

const accepts = hl7v2ToJsonPostSchema.produces;

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {*=} options.bearerTokenAuthKeys - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		hl7v2ToJsonPostSchema.security = [{ bearerToken: [] }];
		hl7v2ToJsonPostSchema.response[401] = {
			$ref: "responses#/properties/unauthorized",
			description: "Unauthorized",
		};
	}

	server.addContentTypeParser(
		hl7v2ToJsonPostSchema.consumes,
		{ parseAs: "string" },
		async (_req, payload) => {
			/**
			 * The Content-Type header can be spoofed so is not trusted implicitly,
			 * this checks the payload is an HL7 v2.x message
			 */
			if (!payload.startsWith("MSH")) {
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
		.register(hl7v2ToJson);

	server.route({
		method: "POST",
		url: "/",
		schema: hl7v2ToJsonPostSchema,
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
