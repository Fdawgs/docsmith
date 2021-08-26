const S = require("fluent-json-schema");

const tags = ["System Administration"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const healthcheckGetSchema = {
	tags,
	summary:
		"Used by monitoring software to poll and confirm the API is running",
	operationId: "getHealthcheck",
	produces: ["text/plain"],
	response: {
		200: S.string().const("ok"),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { healthcheckGetSchema };
