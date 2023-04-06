const accepts = require("@fastify/accepts");
const fs = require("fs/promises");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const isPdf = require("../../../utils/is-pdf/index");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

describe("HTML-to-PDF route", () => {
	let config;
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

	afterAll(async () => {
		await server.close();
	});

	test("Should convert HTML file to PDF", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_html.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const body = response.payload;

		expect(isPdf.raw(body)).toBe(true);

		expect(response.statusCode).toBe(200);

		return response.statusCode;
	});

	test("Should return HTTP status code 415 if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.5_lorem_ipsum.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type: application/pdf",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);

		return response.statusCode;
	});

	test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_html.html"
			),
			headers: {
				accept: "application/javascript",
				"content-type": "application/rtf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
