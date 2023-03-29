/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
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
				"convert PDF file to TXT and ignore invalid `test` query string param",
			query: {
				test: "test",
			},
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

	// OCR tests that use pdftocairo and tesseract
	test.each([
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

		const { body, docLocation } = JSON.parse(response.payload);

		expect(body).toEqual(
			expect.stringContaining("The NHS belongs to the people")
		);
		expect(isHtml(body)).toBe(false);
		// Check the docLocation object contains the expected properties
		expect(docLocation).toEqual(
			expect.objectContaining({
				directory: expect.any(String),
				id: expect.stringMatching(/^docsmith_pdf-to-txt_/m),
			})
		);
		// Check that the image files has been removed from the temp directory
		await expect(fs.readdir(config.poppler.tempDir)).resolves.toHaveLength(
			0
		);
		expect(response.statusCode).toBe(200);
	});

	test("Should convert PDF file to TXT wrapped in HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				firstPageToConvert: 2,
				generateHtmlMetaFile: true,
				lastPageToConvert: 2,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body } = JSON.parse(response.payload);
		const dom = new JSDOM(body);

		expect(isHtml(body)).toBe(true);
		// Check only one meta and title element exists
		expect(dom.window.document.querySelectorAll("meta")).toHaveLength(1);
		expect(dom.window.document.querySelectorAll("title")).toHaveLength(1);
		// Check that head element contains only a meta and title element in the correct order
		expect(dom.window.document.head.firstChild.tagName).toBe("META");
		expect(dom.window.document.head.firstChild).toEqual(
			expect.objectContaining({
				content: expect.stringMatching(/^text\/html; charset=utf-8$/im),
				httpEquiv: expect.stringMatching(/^content-type$/im),
			})
		);
		expect(
			dom.window.document.head.querySelector("title").textContent
		).toMatch(/^docsmith_pdf-to-txt_/m);
		// String found at the start of the HTML document
		expect(dom.window.document.querySelector("pre").textContent).toEqual(
			expect.stringContaining("The NHS belongs to the people")
		);
		// String found at the end of the HTML document
		expect(dom.window.document.querySelector("pre").textContent).toEqual(
			expect.stringContaining(
				"a full and transparent debate with the public, patients and staff."
			)
		);
		expect(response.statusCode).toBe(200);
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
