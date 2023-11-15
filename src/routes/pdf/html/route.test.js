"use strict";

const { readFile } = require("node:fs/promises");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const generateCombos = require("../../../../test_resources/utils/gen-combos");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const embedHtmlImages = require("../../../plugins/embed-html-images");
const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

// Generates 64 different combinations
const queryStrings = generateCombos([
	{ backgroundColor: "white" },
	{ firstPageToConvert: "1" },
	{ fonts: "Arial" },
	{ ignoreImages: "true" },
	{ noDrm: "true" },
	{ removeAlt: "true" },
]);

describe("PDF-to-HTML route", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();
		await server
			.register(accepts)
			.register(sensible)
			.register(embedHtmlImages, config.poppler)
			.register(sharedSchemas)
			.register(tidyCss)
			.register(tidyHtml)
			.register(route, config)
			.ready();
	});

	afterAll(async () => server.close());

	it("Returns PDF file converted to HTML", async () => {
		expect.assertions(queryStrings.length * 4);
		await Promise.all(
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
						),
						query: { ...queryString, lastPageToConvert: "1" },
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(response.body).toMatch("for England");
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

	it("Returns HTTP status code 400 if file is missing", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map((queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						query: { ...queryString, lastPageToConvert: "1" },
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toStrictEqual({
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

	it("Returns HTTP status code 415 if file with '.pdf' extension is not a valid PDF file", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test_resources/test_files/pdf_invalid.pdf"
						),
						query: { ...queryString, lastPageToConvert: "1" },
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toStrictEqual({
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
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test_resources/test_files/html_valid_empty.html"
						),
						query: { ...queryString, lastPageToConvert: "1" },
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/html",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toStrictEqual({
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
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: "1",
			},
			headers: {
				accept: "application/javascript",
				"content-type": "application/pdf",
			},
		});

		expect(JSON.parse(response.body)).toStrictEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
