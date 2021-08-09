const S = require("fluent-json-schema");

const tags = ["DOCX"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const docxToHtmlPostSchema = {
	tags,
	summary: "Convert DOCX documents to HTML format",
	operationId: "postDocxToHtml",
	consumes: [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	],
	produces: ["text/html"],
	query: S.object()
		.prop(
			"backgroundColor",
			S.string()
				.description("HTML document background color")
				.examples(["white", "#FFFFFF"])
		)
		.prop(
			"fonts",
			S.string()
				.description(
					"Define the font(s) of the text in the returned HTML document"
				)
				.examples(["Arial", "Arial, Sans Serif"])
		)
		.prop(
			"removeAlt",
			S.boolean().description("Remove the alt attribute from image tags")
		),
	response: {
		200: S.string(),
	},
};

module.exports = { docxToHtmlPostSchema };
