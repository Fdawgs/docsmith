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
	summary: "Convert DOCX to HTML",
	description:
		"Returns the result of converting a DOCX document to HTML format.",
	operationId: "postDocxToHtml",
	consumes: [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	],
	produces: ["text/html"],
	query: S.object()
		.prop(
			"backgroundColor",
			S.string()
				.description(
					"HTML document background color; replace the `background-color` CSS property for `<div>` elements"
				)
				.pattern(/^[#a-zA-Z0-9]+$/m)
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
			"language",
			S.string()
				.description(
					"Set the `lang` and `xml:lang` attributes of the `<html>` tag"
				)
				.pattern(/^[-a-zA-Z0-9]+$/m)
				.default("en")
		)
		.prop(
			"removeAlt",
			S.boolean().description(
				"Remove the `alt` attribute from `<img>` tags"
			)
		),
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

module.exports = { docxToHtmlPostSchema };
