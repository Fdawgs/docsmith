const accepts = require("@fastify/accepts");
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

describe("DOC-to-TXT route", () => {
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

	it("Returns DOC file converted to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_doc.doc"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "application/msword",
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
				"content-type": "application/msword",
			},
		});

		expect(JSON.parse(response.body)).toEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);
	});

	it.each([
		{
			testName: "with '.doc' extension is not a valid DOC file",
			filePath: "./test_resources/test_files/invalid_doc.doc",
		},
		{
			testName: "is a valid CFBF file but is not a Microsoft Word file",
			filePath: "./test_resources/test_files/valid_xls.xls",
		},
	])(
		"Returns HTTP status code 415 if file $testName",
		async ({ filePath }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				body: await fs.readFile(filePath),
				query: {
					lastPageToConvert: 1,
				},
				headers: {
					accept: "application/json, text/plain",
					"content-type": "application/msword",
				},
			});

			expect(JSON.parse(response.body)).toEqual({
				error: "Unsupported Media Type",
				message: "Unsupported Media Type",
				statusCode: 415,
			});
			expect(response.statusCode).toBe(415);
		}
	);

	it("Returns HTTP status code 415 if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_empty_html.html"
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
				"./test_resources/test_files/valid_doc.doc"
			),
			headers: {
				accept: "application/javascript",
				"content-type": "application/msword",
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
