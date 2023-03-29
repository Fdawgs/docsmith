/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");
const imageToTxt = require("../image-to-txt");

describe("PDF-to-TXT conversion plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.poppler.tempDir = "./src/temp-test-pdf-to-txt/";

		server = Fastify({ pluginTimeout: 30000 });

		server.addContentTypeParser(
			"application/pdf",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server
			.register(imageToTxt, config.tesseract)
			.register(sensible)
			.register(plugin, config.poppler);

		server.post("/", (req, res) => {
			res.header("content-type", "application/json").send(
				req.conversionResults
			);
		});

		await server.ready();
	});

	afterAll(async () => {
		await Promise.all([
			fs.rm(config.poppler.tempDir, { recursive: true }),
			server.close(),
		]);
	});

	test.each([
		{ testName: "convert PDF file to TXT" },
		{
			testName:
				"convert PDF file to HTML and ignore invalid `test` query string param",
			query: {
				test: "test",
			},
		},
		{ testName: "convert PDF file to TXT using OCR", query: { ocr: true } },
		{
			testName:
				"convert PDF file to TXT using OCR and ignore invalid `test` query string param ",
			query: { ocr: true, test: "test" },
		},
	])("Should $testName", async ({ query }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				firstPageToConvert: 2,
				lastPageToConvert: 2,
				...query,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body } = JSON.parse(response.payload);

		expect(body).toEqual(
			expect.stringContaining("The NHS belongs to the people")
		);
		expect(isHtml(body)).toBe(false);
	});

	test("Should convert PDF file to TXT wrapped in HTML", async () => {
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
				"content-type": "application/pdf",
			},
		});

		const { body } = JSON.parse(response.payload);

		expect(body).toEqual(expect.stringContaining("for England"));
		expect(isHtml(body)).toBe(true);
	});

	test.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid PDF file",
			readFile: true,
		},
		{
			testName: "is not a valid PDF file for OCR",
			readFile: true,
			query: {
				lastPageToConvert: 1,
				ocr: true,
			},
		},
	])(
		"Should return HTTP status code 400 if PDF file $testName",
		async ({ readFile, query }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				headers: {
					"content-type": "application/pdf",
				},
				query,
				body: readFile
					? await fs.readFile(
							"./test_resources/test_files/invalid_pdf.pdf"
					  )
					: undefined,
			});

			expect(JSON.parse(response.payload)).toEqual({
				error: "Bad Request",
				message: "Bad Request",
				statusCode: 400,
			});
			expect(response.statusCode).toBe(400);
		}
	);
});
