const S = require("fluent-json-schema");

const tags = ["RTF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const rtfToHtmlPostSchema = {
	tags,
	summary: "Convert RTF to HTML",
	description:
		"Returns the result of converting an RTF document to HTML format. Images are discarded.",
	operationId: "postRtfToHtml",
	consumes: ["application/rtf"],
	produces: ["text/html"],
	query: S.object()
		.additionalProperties(false)
		.prop(
			"backgroundColor",
			S.string()
				.description(
					"HTML document background color; replace the `background-color` CSS property for `<div>` elements"
				)
				.pattern(/^[#a-zA-Z0-9()%, .]+$/m)
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
				.pattern(/^[-a-zA-Z0-9]+$/m)
				.default("en")
		)
		.prop(
			"removeAlt",
			S.boolean().description(
				"Set the `alt` attribute in `<img>` tags to an empty string"
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
		500: S.ref("responses#/definitions/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { rtfToHtmlPostSchema };
