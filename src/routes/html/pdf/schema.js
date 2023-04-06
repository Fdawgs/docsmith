const S = require("fluent-json-schema");

const tags = ["HTML"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const htmlToPdfPostSchema = {
	tags,
	summary: "Convert HTML to PDF",
	description:
		"Returns the result of converting a HTML document to PDF format.",
	operationId: "postHtmlToPdf",
	consumes: ["text/html"],
	produces: ["application/pdf"],
	query: S.object().additionalProperties(false),
	response: {
		200: {
			content: {
				"application/pdf": {
					schema: {
						type: "string",
					},
				},
			},
		},
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

module.exports = { htmlToPdfPostSchema };
