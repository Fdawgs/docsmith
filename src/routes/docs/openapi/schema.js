const S = require("fluent-json-schema").default;

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const docsOpenapiGetSchema = {
	hide: true,
	summary: "List OpenAPI definitions",
	description: "Retrieves OpenAPI definitions.",
	operationId: "getDocsOpenapi",
	produces: ["application/json", "application/xml"],
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
