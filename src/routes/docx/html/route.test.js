const accepts = require("fastify-accepts");
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("fastify-sensible");
const plugin = require(".");
const getConfig = require("../../../config");

const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

describe("DOCX-to-HTML route", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify()
			.register(accepts)
			.register(sensible)
			.register(tidyCss)
			.register(tidyHtml)
			.register(plugin, config);

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should return DOCX file converted to HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_docx.docx"
			),
			query: {
				removeAlt: true,
			},
			headers: {
				accept: "application/json, text/html",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		expect(response.payload).toEqual(
			expect.stringContaining("Ask not what your country can do for you")
		);
		expect(isHtml(response.payload)).toEqual(true);
		expect(response.statusCode).toEqual(200);
	});

	test("Should return HTTP status code 415 if file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",

			headers: {
				accept: "application/json, text/html",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		expect(response.statusCode).toEqual(415);
		expect(response.statusMessage).toEqual("Unsupported Media Type");
	});

	test("Should return HTTP status code 415 if file with '.docx' extension is not a valid DOCX file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/invalid_docx.docx"
			),
			query: {
				lastPageToConvert: 2,
			},
			headers: {
				accept: "application/json, text/html",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		expect(response.statusCode).toEqual(415);
		expect(response.statusMessage).toEqual("Unsupported Media Type");
	});

	test("Should return HTTP status code 415 if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_empty_html.html"
			),
			headers: {
				accept: "application/json, text/html",
				"content-type": "application/html",
			},
		});

		expect(response.statusCode).toEqual(415);
		expect(response.statusMessage).toEqual("Unsupported Media Type");
	});

	test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_docx.docx"
			),
			headers: {
				accept: "application/javascript",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		expect(response.statusCode).toEqual(406);
	});
});
