/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs").promises;
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const sensible = require("fastify-sensible");
const plugin = require(".");
const getConfig = require("../../config");
const imageToTxt = require("../image-to-txt");

describe("PDF-to-TXT Conversion Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.poppler.tempDirectory = "./src/temp2/";

		server = Fastify();

		server.addContentTypeParser("application/pdf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server
			.register(imageToTxt, config.tesseract)
			.register(sensible)
			.register(plugin, config.poppler);

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.conversionResults);
		});

		await server.ready();
	});

	afterAll(async () => {
		await fs.rm(config.poppler.tempDirectory, { recursive: true });
		await server.close();
	});

	test("Should convert PDF file to TXT", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 1,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(false);
	});

	test("Should convert PDF file to TXT using OCR", async () => {
		let response = await server.inject({
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
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("NHS"));
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(false);
	});

	test("Should return HTTP status code 400 if PDF file is not a valid PDF file for OCR", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				lastPageToConvert: 1,
				ocr: true,
			},
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

	test("Should ignore invalid `test` query string params and convert PDF file to TXT", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				firstPageToConvert: 1,
				lastPageToConvert: 1,
				test: "test",
			},
			body: await fs.readFile(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(false);
	});

	test("Should convert PDF file to TXT wrapped in HTML", async () => {
		let response = await server.inject({
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

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(true);
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
});
