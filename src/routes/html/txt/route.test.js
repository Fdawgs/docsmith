/* eslint-disable security/detect-non-literal-fs-filename -- Test files are not user-provided */

"use strict";

const { readFile } = require("node:fs/promises");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const htmlToTxt = require("../../../plugins/html-to-txt");
const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

describe("HTML-to-TXT route", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();
		await server
			.register(accepts)
			.register(sensible)
			.register(htmlToTxt)
			.register(tidyCss)
			.register(tidyHtml)
			.register(sharedSchemas)
			.register(route, config)
			.ready();
	});

	afterAll(async () => server.close());

	it.each([
		{
			testName: "HTML file converted to TXT",
			filePath: "./test_resources/test_files/html_valid.html",
			headers: {
				"content-type": "text/html",
			},
		},
		{
			testName: "XHTML file converted to TXT",
			filePath: "./test_resources/test_files/xhtml_valid.xhtml",
			headers: {
				"content-type": "application/xhtml+xml",
			},
		},
		{
			testName: "HTML converted to TXT with hidden elements extracted",
			filePath: "./test_resources/test_files/html_valid.html",
			headers: {
				"content-type": "text/html",
			},
			query: {
				extract_hidden: "true",
			},
		},
		{
			testName:
				"XHTML file converted to TXT with hidden elements extracted",
			filePath: "./test_resources/test_files/xhtml_valid.xhtml",
			headers: {
				"content-type": "application/xhtml+xml",
			},
			query: {
				extract_hidden: "true",
			},
		},
	])("Returns $testName", async ({ filePath, headers, query }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(filePath),
			query: {
				...query,
			},
			headers: {
				accept: "application/json, text/plain",
				...headers,
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.headers).toMatchObject({
			"content-type": "text/plain; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if body is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				accept: "application/json, text/plain",
				"content-type": "text/html",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Bad Request",
			message: "Body cannot be empty",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});

	it.each([
		{
			testName: "is not a valid HTML file",
			body: Buffer.from("test"),
			headers: {
				"content-type": "text/html",
			},
		},
		{
			testName: "is not a valid XHTML file",
			body: Buffer.from("test"),
			headers: {
				"content-type": "aapplication/xhtml+xml",
			},
		},
	]);
	it("Returns HTTP status code 415 if body $testName", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: Buffer.from("test"),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "text/html",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);
	});

	it("Returns HTTP status code 415 if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/html_valid_empty.html"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "application/html",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type: application/html",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);
	});

	it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/html_valid.html"),
			headers: {
				accept: "application/javascript",
				"content-type": "text/html",
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
