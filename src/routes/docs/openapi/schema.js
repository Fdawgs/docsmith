const S = require("fluent-json-schema");

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const docsOpenapiGetSchema = {
	hide: true,
	summary: "List OpenAPI specification",
	description: "Retrieves OpenAPI specification.",
	operationId: "getDocsOpenapi",
	produces: ["application/json"],
	response: {
		200: S.object()
			.additionalProperties(true)
			.prop("openapi", S.string().required()),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { docsOpenapiGetSchema };
