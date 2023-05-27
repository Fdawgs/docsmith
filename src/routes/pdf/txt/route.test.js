const accepts = require("@fastify/accepts");
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const generateCombos = require("../../../../test_resources/utils/genCombos");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const imageToTxt = require("../../../plugins/image-to-txt");
const tidyHtml = require("../../../plugins/tidy-html");

// Generates 32 different combinations
const queryStrings = generateCombos([
	{ firstPageToConvert: 1 },
	{ eolConvention: "unix" },
	{ maintainLayout: true },
	{ noDiagonalText: true },
	{ noPageBreaks: true },
]);

describe("PDF-to-TXT route", () => {
	let config;
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

	afterAll(async () => {
		await server.close();
	});

	it("Returns PDF file converted to TXT", async () => {
		await Promise.all(
			queryStrings.map(async (queryString) => {
				const query = queryString;
				query.lastPageToConvert = 1;

				return server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
						),
						query,
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
					});
			})
		);
	});

	it("Returns PDF file converted to TXT using OCR", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 1,
				ocr: true,
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
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				generateHtmlMetaFile: true,
				lastPageToConvert: 1,
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

	it("Returns HTTP status code 415 if file is missing", async () => {
		await Promise.all(
			queryStrings.map((queryString) => {
				const query = queryString;
				query.lastPageToConvert = 1;

				return server
					.inject({
						method: "POST",
						url: "/",
						query,
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					});
			})
		);
	});

	it("Returns HTTP status code 415 if file with '.pdf' extension is not a valid PDF file", async () => {
		await Promise.all(
			queryStrings.map(async (queryString) => {
				const query = queryString;
				query.lastPageToConvert = 1;

				return server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/invalid_pdf.pdf"
						),
						query,
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/pdf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					});
			})
		);
	});

	it("Returns HTTP status code 415 if file media type is not supported by route", async () => {
		await Promise.all(
			queryStrings.map(async (queryString) => {
				const query = queryString;
				query.lastPageToConvert = 1;

				return server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/valid_empty_html.html"
						),
						query,
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/html",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.body)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type: application/html",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					});
			})
		);
	});

	it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 1,
			},
			headers: {
				accept: "application/javascript",
				"content-type": "application/pdf",
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
