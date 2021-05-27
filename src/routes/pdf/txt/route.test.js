/* eslint-disable no-param-reassign */
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const generateCombos = require("../../../../test_resources/utils/genCombos");
const plugin = require(".");
const getConfig = require("../../../config");

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
	let options;
	let server;

	beforeAll(async () => {
		options = await getConfig();

		server = Fastify().register(tidyHtml);
		server.register(plugin, options);

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should return PDF file converted to TXT", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				query.lastPageToConvert = 2;

				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query,
					headers: {
						"content-type": "application/pdf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining("The NHS Constitution")
				);
				expect(isHtml(response.payload)).toEqual(false);
				expect(response.statusCode).toEqual(200);

				return response.statusCode;
			})
		);
	});

	test("Should return PDF file converted to TXT wrapped in HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				generateHtmlMetaFile: true,
				lastPageToConvert: 2,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(response.payload).toEqual(
			expect.stringContaining("The NHS Constitution")
		);
		expect(isHtml(response.payload)).toEqual(true);
		expect(response.statusCode).toEqual(200);
	});

	test("Should return 415 error code if file is missing", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				query.lastPageToConvert = 2;

				const response = await server.inject({
					method: "POST",
					url: "/",
					query,
					headers: {
						"content-type": "application/pdf",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});

	test("Should return 415 error code if file with '.pdf' extension is not a valid PDF file", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				query.lastPageToConvert = 2;

				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/invalid_pdf.pdf"
					),
					query: {
						lastPageToConvert: 2,
					},
					headers: {
						"content-type": "application/pdf",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});

	test("Should return 415 error code if file media type is not supported by route", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				query.lastPageToConvert = 2;

				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/valid_empty_html.html"
					),
					headers: {
						"content-type": "application/html",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});
});
