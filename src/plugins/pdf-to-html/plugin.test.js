/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");

/**
 * Used to check that common incorrectly converted Windows-1252
 * to UTF-8 values are removed by the `fix-utf8` module
 */
const artifacts =
	/â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥|Â|Ã|â€|�/g;

describe("PDF-to-HTML conversion plugin", () => {
	let config;
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
			fs.rm(config.poppler.tempDir, { recursive: true }),
			server.close(),
		]);
	});

	test("Should convert PDF file to HTML and place in specified directory", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 2,
				ignoreImages: false,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body, docLocation } = JSON.parse(response.payload);
		const dom = new JSDOM(body);

		expect(body).toEqual(expect.stringContaining("for&nbsp;England"));
		expect(body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(body)).toBe(true);
		expect(dom.window.document.querySelectorAll("meta")).toHaveLength(1);
		expect(dom.window.document.querySelectorAll("title")).toHaveLength(1);
		expect(docLocation).toEqual(
			expect.objectContaining({
				directory: expect.any(String),
				html: expect.any(String),
				id: expect.any(String),
			})
		);
		await expect(fs.readFile(docLocation.html)).rejects.toThrow();
		await expect(fs.readdir(config.poppler.tempDir)).resolves.toHaveLength(
			0
		);
	});

	test("Should ignore invalid `test` query string params and convert PDF file to HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				firstPageToConvert: 1,
				ignoreImages: true,
				lastPageToConvert: 2,
				test: "test",
			},
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		const { body, docLocation } = JSON.parse(response.payload);
		const dom = new JSDOM(body);

		expect(body).toEqual(expect.stringContaining("for&nbsp;England"));
		expect(body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(body)).toBe(true);
		expect(dom.window.document.querySelectorAll("meta")).toHaveLength(1);
		expect(dom.window.document.querySelectorAll("title")).toHaveLength(1);
		expect(docLocation).toEqual(
			expect.objectContaining({
				directory: expect.any(String),
				html: expect.any(String),
				id: expect.any(String),
			})
		);
		await expect(fs.readFile(docLocation.html)).rejects.toThrow();
		await expect(fs.readdir(config.poppler.tempDir)).resolves.toHaveLength(
			0
		);
	});

	test("Should return HTTP status code 400 if PDF file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Bad Request",
			message: "Bad Request",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});

	test("Should return HTTP status code 400 if PDF file is not a valid PDF file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/invalid_pdf.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Bad Request",
			message: "Bad Request",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});
});
