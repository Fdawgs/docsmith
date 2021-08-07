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
	summary: "Convert DOCX documents to TXT format",
	operationId: "postDocxToTxt",
	consumes: [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	],
	produces: ["text/plain"],
	response: {
		200: S.string(),
	},
};

module.exports = { docxToTxtPostSchema };
