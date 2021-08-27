const S = require("fluent-json-schema");

const tags = ["RTF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const rtfToTxtPostSchema = {
	tags,
	summary: "Convert RTF to TXT",
	description:
		"Returns the result of converting an RTF document to TXT format.",
	operationId: "postRtfToTxt",
	consumes: ["application/rtf"],
	produces: ["text/plain"],
	response: {
		200: S.string(),
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
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

module.exports = { rtfToTxtPostSchema };
