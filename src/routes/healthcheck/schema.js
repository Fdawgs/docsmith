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
	response: {
		200: S.string().const("ok"),
	},
};

module.exports = { healthcheckGetSchema };
