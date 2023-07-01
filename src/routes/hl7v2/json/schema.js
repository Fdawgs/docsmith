const S = require("fluent-json-schema");

const tags = ["HL7 v2.x"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 */
const hl7v2ToJsonPostSchema = {
	tags,
	summary: "Convert HL7 v2.x message to JSON",
	description:
		"Returns the result of converting an HL7 v2.x message to JSON format.",
	operationId: "postHl7v2ToJson",
	consumes: ["text/hl7v2"],
	produces: ["application/json"],
	response: {
		200: S.object().additionalProperties(true),
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
		),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/properties/unsupportedMediaType").description(
			"Unsupported Media Type"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { hl7v2ToJsonPostSchema };
