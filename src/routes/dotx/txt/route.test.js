const accepts = require("@fastify/accepts");
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

describe("DOTX-to-TXT route", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();
		await server
			.register(accepts)
			.register(sensible)
			.register(sharedSchemas)
			.register(route, config)
			.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	it("Returns DOTX file converted to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/dotx_valid.dotx"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		});

		expect(response.body).toMatch(
			"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
		);
		expect(isHtml(response.body)).toBe(false);
		expect(response.headers).toMatchObject({
			"content-type": "text/plain; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 415 if file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",

			headers: {
				accept: "application/json, text/plain",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		});

		expect(JSON.parse(response.body)).toEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);
	});

	it("Returns HTTP status code 415 if file with '.dotx' extension is not a valid DOTX file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/dotx_invalid.dotx"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		});

		expect(JSON.parse(response.body)).toEqual({
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
			body: await fs.readFile(
				"./test_resources/test_files/html_valid_empty.html"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "application/html",
			},
		});

		expect(JSON.parse(response.body)).toEqual({
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
			body: await fs.readFile(
				"./test_resources/test_files/dotx_valid.dotx"
			),
			headers: {
				accept: "application/javascript",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		});

		expect(JSON.parse(response.body)).toEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
