/* eslint-disable security/detect-non-literal-fs-filename -- Test filenames are not user-provided */

"use strict";

const { readFile, readdir, rm } = require("node:fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const { Poppler } = require("node-poppler");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");
const imageToTxt = require("../image-to-txt");

describe("PDF-to-TXT conversion plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
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

	afterAll(async () =>
		Promise.all([
			rm(config.poppler.tempDir, { recursive: true }),
			server.close(),
		])
	);

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{ testName: "Converts PDF file to TXT" },
		{
			testName:
				"Converts PDF file to TXT and ignore invalid `test` query string param",
			query: {
				test: "test",
			},
		},
	])("$testName", async ({ query }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				firstPageToConvert: "2",
				lastPageToConvert: "2",
				...query,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body } = JSON.parse(response.body);

		expect(body).toMatch("The NHS belongs to the people");
		expect(isHtml(body)).toBe(false);
	});

	/**
	 * OCR tests that use pdftocairo and tesseract
	 * @todo use `it.concurrent.each()` once it is no longer experimental
	 */
	it.each([
		{
			testName: "Converts PDF file to TXT using OCR",
			query: { ocr: "true" },
		},
		{
			testName:
				"Converts PDF file to TXT using OCR and ignore invalid `test` query string param ",
			query: { ocr: "true", test: "test" },
		},
	])("$testName", async ({ query }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				firstPageToConvert: "1",
				lastPageToConvert: "2",
				...query,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body, docLocation } = JSON.parse(response.body);

		expect(body).toMatch("The NHS belongs to the people");
		// String found at end of second page
		expect(body).toMatch(
			/a full and transparent debate with the public, patients and staff.$/mu
		);
		expect(isHtml(body)).toBe(false);
		// Check the docLocation object contains the expected properties
		expect(docLocation).toMatchObject({
			directory: expect.any(String),
			id: expect.stringMatching(/^docsmith_pdf-to-txt_/u),
		});
		// Check the image files has been removed from the temp directory
		await expect(readdir(config.poppler.tempDir)).resolves.toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});

	it("Converts PDF file to TXT wrapped in HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				firstPageToConvert: "2",
				generateHtmlMetaFile: "true",
				lastPageToConvert: "2",
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body } = JSON.parse(response.body);
		const dom = new JSDOM(body);

		expect(isHtml(body)).toBe(true);
		// Check only one meta and title element exists
		expect(dom.window.document.querySelectorAll("meta")).toHaveLength(1);
		expect(dom.window.document.querySelectorAll("title")).toHaveLength(1);
		// Check head element contains only a meta and title element in the correct order
		expect(dom.window.document.head.children[0].tagName).toBe("META");
		expect(dom.window.document.head.firstChild).toMatchObject({
			content: expect.stringMatching(/^text\/html; charset=utf-8$/iu),
			httpEquiv: expect.stringMatching(/^content-type$/iu),
		});
		expect(
			dom.window.document.head.querySelector("title")?.textContent
		).toMatch(/^docsmith_pdf-to-txt_/u);
		// String found at the start of the HTML document
		expect(dom.window.document.querySelector("pre")?.textContent).toMatch(
			"The NHS belongs to the people"
		);
		// String found at the end of the HTML document
		expect(dom.window.document.querySelector("pre")?.textContent).toMatch(
			/a full and transparent debate with the public, patients and staff.$/mu
		);
		expect(response.statusCode).toBe(200);
	});

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{ testName: "is missing" },
		{ testName: "is an empty file", body: Buffer.from("") },
		{
			testName: "is not a valid PDF file",
			body: Buffer.from("test"),
		},
		{
			testName: "is not a valid PDF file for OCR",
			body: Buffer.from("test"),
			query: {
				lastPageToConvert: "1",
				ocr: "true",
			},
		},
	])(
		"Returns HTTP status code 400 if PDF file $testName",
		async ({ body, query }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				body,
				query,
				headers: {
					"content-type": "application/pdf",
				},
			});

			expect(JSON.parse(response.body)).toStrictEqual({
				error: "Bad Request",
				message: "Bad Request",
				statusCode: 400,
			});
			expect(response.statusCode).toBe(400);
		}
	);

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{
			testName: "poppler.pdfToText()",
			funcName: "pdfToText",
		},
		{
			testName: "poppler.pdfToCairo() for OCR",
			funcName: "pdfToCairo",
			query: {
				ocr: "true",
			},
		},
	])(
		"Returns HTTP status code 400 if $testName throws an error",
		async ({ funcName, query }) => {
			const mockPoppler = jest
				.spyOn(Poppler.prototype, funcName)
				.mockRejectedValue(new Error("test error"));

			const response = await server.inject({
				method: "POST",
				url: "/",
				body: await readFile(
					"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
				),
				query: {
					lastPageToConvert: "1",
					...query,
				},
				headers: {
					"content-type": "application/pdf",
				},
			});

			expect(JSON.parse(response.body)).toStrictEqual({
				error: "Internal Server Error",
				message: "test error",
				statusCode: 500,
			});
			expect(response.statusCode).toBe(500);

			mockPoppler.mockRestore();
		}
	);
});
