const S = require("fluent-json-schema");

const tags = ["System Administration"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const pdfToHtmlPostSchema = {
	tags,
	summary:
		"Used by monitoring software to poll and confirm the API is running",
	operationId: "postPdfToHtml",
	produces: ["text/html"],
	response: {
		200: S.string(),
	},
};

module.exports = { pdfToHtmlPostSchema };
