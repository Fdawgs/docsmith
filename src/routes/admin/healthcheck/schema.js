"use strict";

const S = require("fluent-json-schema").default;

const tags = ["System administration"];

/**
 * Fastify uses AJV for JSON Schema Validation.
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 * @see {@link https://fastify.dev/docs/latest/Reference/Validation-and-Serialization | Fastify Validation and Serialization}
 */
const healthcheckGetSchema = {
	tags,
	summary: "Ping",
	description:
		"This is a dummy endpoint used to test if the server is accessible.",
	operationId: "getHealthcheck",
	produces: ["application/json", "application/xml"],
	response: {
		200: {
			content: {
				"text/plain": {
					schema: {
						type: "string",
						enum: ["ok"],
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

module.exports = { healthcheckGetSchema };
