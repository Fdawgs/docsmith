"use strict";

const S = require("fluent-json-schema").default;

/**
 * Fastify uses AJV for JSON Schema Validation.
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 * @see {@link https://fastify.io/docs/latest/Reference/Validation-and-Serialization | Fastify Validation and Serialization}
 */
const docsGetSchema = {
	hide: true,
	summary: "List documentation",
	description: "Retrieves OpenAPI documentation.",
	operationId: "getDocs",
	produces: ["application/json", "application/xml"],
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
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { docsGetSchema };
