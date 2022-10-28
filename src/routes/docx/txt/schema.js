const S = require("fluent-json-schema");

const tags = ["DOCX"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
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
	produces: ["application/json", "application/xml"],
	response: {
		200: {
			content: {
				"text/plain": {
					schema: {
						type: "string",
					},
				},
			},
		},
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
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { docxToTxtPostSchema };
