const fp = require("fastify-plugin");
const S = require("fluent-json-schema");

/**
 * @author Frazer Smith
 * @description Plugin that adds collection of shared schemas for re-use throughout server.
 * @param {Function} server - Fastify instance.
 */
async function plugin(server) {
	// Response schemas
	server.addSchema(
		S.object()
			.id("responses")
			.title("Responses")
			.description("Common response schemas")
			.definition(
				"badRequest",
				S.object()
					.id("#badRequest")
					.title("400 Bad Request")
					.prop("statusCode", S.number().const(400))
					.prop("error", S.string().const("Bad Request"))
					.prop("message", S.string().const("Bad Request"))
			)
			.definition(
				"unauthorized",
				S.object()
					.id("#unauthorized")
					.title("401 Unauthorized")
					.prop("statusCode", S.number().const(401))
					.prop("error", S.string().const("Unauthorized"))
					.prop(
						"message",
						S.string().examples(["missing authorization header"])
					)
			)
			.definition(
				"notAcceptable",
				S.object()
					.id("#notAcceptable")
					.title("406 Not Acceptable Response")
					.prop("statusCode", S.number().const(406))
					.prop("error", S.string().const("Not Acceptable"))
					.prop("message", S.string().const("Not Acceptable"))
			)
			.definition(
				"unsupportedMediaType",
				S.object()
					.id("#unsupportedMediaType")
					.title("415 Unsupported Media Type")
					.prop("statusCode", S.number().const(415))
					.prop("error", S.string().const("Unsupported Media Type"))
					.prop("message", S.string().const("Unsupported Media Type"))
			)
			.definition(
				"tooManyRequests",
				S.object()
					.id("#tooManyRequests")
					.title("429 Too Many Requests Response")
					.prop("statusCode", S.number().const(429))
					.prop("error", S.string().const("Too Many Requests"))
					.prop(
						"message",
						S.string().examples([
							"Rate limit exceeded, retry in 1 minute",
						])
					)
			)
			.definition(
				"serviceUnavailable",
				S.object()
					.id("#serviceUnavailable")
					.title("503 Service Unavailable")
					.prop("statusCode", S.number().const(503))
					.prop("code", S.string().const("FST_UNDER_PRESSURE"))
					.prop("error", S.string().const("Service Unavailable"))
					.prop("message", S.string().const("Service Unavailable"))
			)
	);
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "shared-schemas",
});
