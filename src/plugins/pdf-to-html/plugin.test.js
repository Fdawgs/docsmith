/* eslint-disable security/detect-non-literal-fs-filename */

"use strict";

const { readFile, readdir, rm } = require("node:fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const { Poppler } = require("node-poppler");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");

/**
 * Used to check that common incorrectly converted Windows-1252
 * to UTF-8 values are removed by the `fix-utf8` module
 */
const artifacts =
	// eslint-disable-next-line regexp/prefer-character-class
	/â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥|Â|Ã|â€/gu;

describe("PDF-to-HTML conversion plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.poppler.tempDir = "./src/temp-test-pdf-to-html/";

		server = Fastify();

		server.addContentTypeParser(
			"application/pdf",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(sensible).register(plugin, config.poppler);

		server.post("/", (req, res) => {
			res.header("content-type", "application/json").send(
				req.conversionResults
			);
		});

		await server.ready();
	});

	afterAll(async () => {
		await Promise.all([
			rm(config.poppler.tempDir, { recursive: true }),
			server.close(),
		]);
	});

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{
			testName: "Converts PDF file to HTML",
		},
		{
			testName:
				"Converts PDF file to HTML and ignore invalid `test` query string param",
			query: {
				test: "test",
			},
		},
	])(`$testName`, async ({ query }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: "2",
				ignoreImages: "false",
				...query,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body, docLocation } = JSON.parse(response.body);
		const dom = new JSDOM(body);

		expect(body).not.toMatch(artifacts);
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
		).toMatch(/^docsmith_pdf-to-html_/u);
		// String found in first paragraph of the test document
		expect(dom.window.document.querySelector("p")?.textContent).toMatch(
			/for\sEngland\s/u
		);
		// String found in last paragraph of the test document
		expect(
			dom.window.document.querySelectorAll("p")[
				dom.window.document.querySelectorAll("p").length - 1
			].textContent
		).toMatch(
			/a\sfull\sand\stransparent\sdebate\swith\sthe\spublic,\spatients\sand\sstaff.\s$/u
		);
		// Check the docLocation object contains the expected properties
		expect(docLocation).toMatchObject({
			directory: expect.any(String),
			html: expect.stringMatching(/-html\.html$/iu),
			id: expect.stringMatching(/^docsmith_pdf-to-html_/u),
		});
		// Check the HTML file has been removed from the temp directory
		await expect(readFile(docLocation.html)).rejects.toThrow();
		await expect(readdir(config.poppler.tempDir)).resolves.toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid PDF file",
			read: true,
		},
	])(
		"Returns HTTP status code 400 if PDF file $testName",
		async ({ read }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				body: read
					? await readFile(
							"./test_resources/test_files/pdf_invalid.pdf"
					  )
					: undefined,
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

	it("Returns HTTP status code 400 if poppler.pdfToHtml() throws an error", async () => {
		const mockPoppler = jest
			.spyOn(Poppler.prototype, "pdfToHtml")
			.mockRejectedValue(new Error("test error"));

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: "1",
				ignoreImages: "false",
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
	});
});
