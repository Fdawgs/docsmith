"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const generateCombos = require("../../../../test_resources/utils/gen-combos");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

// Generates 12 different combinations
const queryStrings = generateCombos([
	{ background_color: "white" },
	{ fonts: "Arial" },
	{ fonts: "Arial, Sans Serif" },
	{ language: "fr" },
]);

describe("RTF-to-HTML route", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify({ bodyLimit: 10485760 });
		await server
			.register(accepts)
			.register(sensible)
			.register(sharedSchemas)
			.register(tidyCss)
			.register(tidyHtml)
			.register(route, config)
			.ready();
	});

	afterAll(async () => server.close());

	it("Returns RTF file converted to HTML", async () => {
		expect.assertions(queryStrings.length * 4);
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test_resources/test_files/rtf_valid.rtf"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(response.body).toMatch(
							"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
						);
						expect(isHtml(response.body)).toBe(true);
						expect(response.headers).toMatchObject({
							"content-type": "text/html; charset=utf-8",
						});
						expect(response.statusCode).toBe(200);

						return response.statusCode;
					})
			)
		);
	});

	it("Returns HTTP status code 400 if body is missing", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map((query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(response.json()).toStrictEqual({
							error: "Bad Request",
							message: "Body cannot be empty",
							statusCode: 400,
						});
						expect(response.statusCode).toBe(400);

						return response.statusCode;
					})
			)
		);
	});

	it("Returns HTTP status code 415 if body is not a valid RTF file", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: Buffer.from("test"),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(response.json()).toStrictEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					})
			)
		);
	});

	it("Returns HTTP status code 415 if file media type is not supported by route", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test_resources/test_files/html_valid_empty.html"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/html",
						},
					})
					.then((response) => {
						expect(response.json()).toStrictEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type: application/html",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					})
			)
		);
	});

	it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/rtf_valid.rtf"),
			headers: {
				accept: "application/javascript",
				"content-type": "application/rtf",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
