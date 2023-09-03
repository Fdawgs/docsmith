"use strict";

const S = require("fluent-json-schema").default;

const tags = ["RTF"];

/**
 * Fastify uses AJV for JSON Schema Validation.
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 * @see {@link https://fastify.io/docs/latest/Reference/Validation-and-Serialization | Fastify Validation and Serialization}
 */
const rtfToHtmlPostSchema = {
	tags,
	summary: "Convert RTF to HTML",
	description:
		"Returns the result of converting an RTF document to HTML format. Images are removed.",
	operationId: "postRtfToHtml",
	consumes: ["application/rtf"],
	produces: ["application/json", "application/xml"],
	query: S.object()
		.additionalProperties(false)
		.prop(
			"backgroundColor",
			S.string()
				.description(
					"HTML document background color; set or replace the `background-color` property value of `div` CSS selectors"
				)
				.pattern(/^[\d #%(),.A-Za-z]+$/u)
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
				.pattern(/^[\d\-A-Za-z]+$/u)
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
		500: S.ref("responses#/properties/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { rtfToHtmlPostSchema };
