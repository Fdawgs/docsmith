"use strict";

const { readFile } = require("node:fs/promises");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const htmlToTxt = require("../../../plugins/html-to-txt");

describe("HTML-to-TXT route", () => {
	let config;
	/**
	 * @type {Fastify.FastifyInstance}
	 */
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();
		await server
			.register(accepts)
			.register(sensible)
			.register(htmlToTxt)
			.register(sharedSchemas)
			.register(route, config)
			.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	it("Returns HTML file converted to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/html_valid.html"),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "text/html",
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.headers).toMatchObject({
			"content-type": "text/plain; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				accept: "application/json, text/plain",
				"content-type": "text/html",
			},
		});

		expect(JSON.parse(response.body)).toStrictEqual({
			error: "Bad Request",
			message: "Body cannot be empty",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});

	it("Returns HTTP status code 415 if file with '.html' extension is not a valid HTML file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/html_invalid.html"
			),
			query: {
				lastPageToConvert: "1",
			},
			headers: {
				accept: "application/json, text/plain",
				"content-type": "text/html",
			},
		});

		expect(JSON.parse(response.body)).toStrictEqual({
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

		expect(JSON.parse(response.body)).toStrictEqual({
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

		expect(JSON.parse(response.body)).toStrictEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
