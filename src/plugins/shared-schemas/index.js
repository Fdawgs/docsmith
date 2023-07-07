const fp = require("fastify-plugin");
const S = require("fluent-json-schema").default;

/**
 * @author Frazer Smith
 * @description Plugin that adds a collection of shared schemas for re-use throughout the server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * NOTE: `.definition()` definitions have been replaced with `.prop()` properties, and
	 * `.id()` ids removed due to definitions breaking in v4.12.1 of fastify-swagger.
	 * See https://github.com/fastify/fastify-swagger/issues/524
	 */

	// Response schemas
	server.addSchema(
		S.object()
			.id("responses")
			.title("Responses")
			.description("Common response schemas")
			.prop(
				"badRequest",
				S.object()
					.title("400 Bad Request")
					.prop("statusCode", S.number().const(400))
					.prop("error", S.string().const("Bad Request"))
					.prop(
						"message",
						S.string().examples([
							"querystring/lastPageToConvert must be number",
						])
					)
			)
			.prop(
				"unauthorized",
				S.object()
					.title("401 Unauthorized")
					.prop("statusCode", S.number().const(401))
					.prop("error", S.string().const("Unauthorized"))
					.prop(
						"message",
						S.string().examples(["missing authorization header"])
					)
			)
			.prop(
				"notAcceptable",
				S.object()
					.title("406 Not Acceptable Response")
					.prop("statusCode", S.number().const(406))
					.prop("error", S.string().const("Not Acceptable"))
					.prop("message", S.string().const("Not Acceptable"))
			)
			.prop(
				"unsupportedMediaType",
				S.object()
					.title("415 Unsupported Media Type")
					.prop("statusCode", S.number().const(415))
					.prop("error", S.string().const("Unsupported Media Type"))
					.prop(
						"message",
						S.string().pattern(/^Unsupported Media Type.*$/u)
					)
			)
			.prop(
				"tooManyRequests",
				S.object()
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
			.prop(
				"internalServerError",
				S.object()
					.title("500 Internal Server Error Response")
					.prop("statusCode", S.number().const(500))
					.prop("error", S.string().const("Internal Server Error"))
					.prop("message", S.string().const("Internal Server Error"))
			)
			.prop(
				"serviceUnavailable",
				S.object()
					.title("503 Service Unavailable")
					.prop("statusCode", S.number().const(503))
					.prop("code", S.string().const("FST_UNDER_PRESSURE"))
					.prop("error", S.string().const("Service Unavailable"))
					.prop("message", S.string().const("Service Unavailable"))
			)
	);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "shared-schemas",
});
