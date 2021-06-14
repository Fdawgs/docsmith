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
	summary: "Convert RTF documents to TXT format",
	operationId: "postRtfToTxt",
	consumes: ["application/rtf"],
	produces: ["text/plain"],
	response: {
		200: S.string(),
	},
};

module.exports = { rtfToTxtPostSchema };
