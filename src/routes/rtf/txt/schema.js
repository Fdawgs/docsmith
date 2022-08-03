const S = require("fluent-json-schema");

const tags = ["RTF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
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
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
		),
		401: S.ref("responses#/properties/unauthorized").description(
			"Unauthorized"
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
		500: S.ref("responses#/properties/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { rtfToTxtPostSchema };
