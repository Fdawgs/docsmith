"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const generateCombos = require("../../../../test/utils/gen-combos");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const imageToTxt = require("../../../plugins/image-to-txt");
const tidyHtml = require("../../../plugins/tidy-html");

// Generates 32 different combinations
const queryStrings = generateCombos([
	{ first_page_to_convert: "1" },
	{ eol_convention: "unix" },
	{ maintain_layout: "true" },
	{ no_diagonal_text: "true" },
	{ no_page_breaks: "true" },
]);

describe("PDF-to-TXT route", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		Object.assign(process.env, {
			OCR_ENABLED: true,
		});

		config = await getConfig();

		server = Fastify();
		await server
			.register(accepts)
			.register(imageToTxt, config.tesseract)
			.register(sensible)
			.register(sharedSchemas)
			.register(tidyHtml)
			.register(route, config)
			.ready();
	});

	afterAll(async () => server.close());

	it("Returns PDF file converted to TXT", async () => {
		expect.assertions(queryStrings.length * 4);
		await Promise.all(
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test/files/pdf_1.3_NHS_Constitution.pdf"
						),
						query: { ...queryString, last_page_to_convert: "1" },
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(response.body).toMatch("for England");
						expect(isHtml(response.body)).toBe(false);
						expect(response.headers).toMatchObject({
							"content-type": "text/plain; charset=utf-8",
						});
						expect(response.statusCode).toBe(200);

						return response.statusCode;
					})
			)
		);
	});

	it("Returns PDF file converted to TXT using OCR", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/pdf_1.3_NHS_Constitution.pdf"),
			query: {
				last_page_to_convert: "1",
				ocr: "true",
			},
			headers: {
				accept: "application/json, text/plain",
				"content-type": "application/pdf",
			},
		});

		expect(response.body).toMatch("NHS");
		expect(isHtml(response.body)).toBe(false);
		expect(response.headers).toMatchObject({
			"content-type": "text/plain; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns PDF file converted to TXT wrapped in HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/pdf_1.3_NHS_Constitution.pdf"),
			query: {
				generate_html_meta_file: "true",
				last_page_to_convert: "1",
			},
			headers: {
				accept: "application/json, text/html",
				"content-type": "application/pdf",
			},
		});

		expect(response.body).toMatch("for England");
		expect(isHtml(response.body)).toBe(true);
		expect(response.headers).toMatchObject({
			"content-type": "text/html; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if body is missing", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map((queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						query: { ...queryString, last_page_to_convert: "1" },
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/pdf",
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

	it("Returns HTTP status code 415 if body is not a valid PDF file", async () => {
		expect.assertions(queryStrings.length * 2);
		await Promise.all(
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: Buffer.from("test"),
						query: { ...queryString, last_page_to_convert: "1" },
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/pdf",
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
			queryStrings.map(async (queryString) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await readFile(
							"./test/files/html_valid_empty.html"
						),
						query: { ...queryString, last_page_to_convert: "1" },
						headers: {
							accept: "application/json, text/plain",
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
			body: await readFile("./test/files/pdf_1.3_NHS_Constitution.pdf"),
			query: {
				last_page_to_convert: "1",
			},
			headers: {
				accept: "application/javascript",
				"content-type": "application/pdf",
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
