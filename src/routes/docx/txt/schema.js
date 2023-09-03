"use strict";

const S = require("fluent-json-schema").default;

const tags = ["DOCM", "DOCX", "DOTM", "DOTX"];

/**
 * Fastify uses AJV for JSON Schema Validation.
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 * @see {@link https://fastify.io/docs/latest/Reference/Validation-and-Serialization | Fastify Validation and Serialization}
 */
const docxToTxtPostSchema = {
	tags,
	summary: "Convert DOCX to TXT",
	description:
		"Returns the result of converting a DOCX document (or a DOCM, DOTM, or DOTX variant) to TXT format.",
	operationId: "postDocxToTxt",
	consumes: [
		"application/vnd.ms-word.document.macroEnabled.12",
		"application/vnd.ms-word.template.macroEnabled.12",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
	],
	produces: ["application/json", "application/xml"],
	response: {
		200: {
			content: {
				"text/plain": {
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

module.exports = { docxToTxtPostSchema };
