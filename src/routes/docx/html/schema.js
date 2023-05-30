const S = require("fluent-json-schema");

const tags = ["DOCM", "DOCX", "DOTM", "DOTX"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const docxToHtmlPostSchema = {
	tags,
	summary: "Convert DOCX to HTML",
	description:
		"Returns the result of converting a DOCX document (or a DOCM, DOTM, or DOTX variant) to HTML format.",
	operationId: "postDocxToHtml",
	consumes: [
		"application/vnd.ms-word.document.macroEnabled.12",
		"application/vnd.ms-word.template.macroEnabled.12",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
	],
	produces: ["application/json", "application/xml"],
	query: S.object()
		.additionalProperties(false)
		.prop(
			"backgroundColor",
			S.string()
				.description(
					"HTML document background color; set or replace the `background-color` property value of `div` CSS selectors"
				)
				.pattern(/^[#a-zA-Z0-9()%, .]+$/)
				.examples([
					"white",
					"#FFFFFF",
					"rgb(255, 255, 128)",
					"hsla(50, 33%, 25%, 0.75)",
				])
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
					"Set the `lang` and `xml:lang` attributes of the `<html>` tag. Must be a valid IANA language tag"
				)
				.pattern(/^[-a-zA-Z0-9]+$/)
				.default("en")
		)
		.prop(
			"removeAlt",
			S.boolean().description(
				"Set the `alt` attribute in `<img>` tags to an empty string"
			)
		),
	response: {
		200: {
			content: {
				"text/html": {
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

module.exports = { docxToHtmlPostSchema };
