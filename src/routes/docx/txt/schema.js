const S = require("fluent-json-schema");

const tags = ["DOCX"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const docxToTxtPostSchema = {
	tags,
	summary: "Convert DOCX to TXT",
	description:
		"Returns the result of converting a DOCX document to TXT format.",
	operationId: "postDocxToTxt",
	consumes: [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	],
	produces: ["text/plain"],
	response: {
		200: S.string(),
		400: S.ref("responses#/definitions/badRequest").description(
			"Bad Request"
		),
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/definitions/unsupportedMediaType").description(
			"Unsupported Media Type"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { docxToTxtPostSchema };
