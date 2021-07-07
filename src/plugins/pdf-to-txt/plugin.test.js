/* eslint-disable security/detect-non-literal-fs-filename */
const { cloneDeep } = require("lodash");
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("PDF-to-TXT Conversion Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config = cloneDeep(config);
		config.poppler.tempDirectory = "./src/temp2/";
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser("application/pdf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.conversionResults);
		});
	});

	afterAll(() => {
		fs.rmdir(config.poppler.tempDirectory, { recursive: true }, () => {});
	});

	afterEach(async () => {
		await server.close();
	});

	test("Should convert PDF file to TXT", async () => {
		server.register(plugin, config.poppler);

		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 2,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(false);
	});

	test("Should convert PDF file to TXT using OCR", async () => {
		server.register(plugin, config.poppler);

		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
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
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(false);
	});

	test("Should ignore invalid `test` query string params and convert PDF file to TXT", async () => {
		server.register(plugin, config.poppler);

		let response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				firstPageToConvert: 1,
				lastPageToConvert: 1,
				test: "test",
			},
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(false);
	});

	test("Should convert PDF file to TXT wrapped in HTML", async () => {
		server.register(plugin, config.poppler);

		let response = await server.inject({
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

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(expect.stringContaining("for England"));
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(true);
	});

	test("Should return HTTP 400 error if PDF file is missing", async () => {
		server.register(plugin, config.poppler);

		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/pdf",
			},
		});

		const body = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(400);
		expect(response.statusMessage).toEqual("Bad Request");
		expect(body.statusCode).toEqual(400);
		expect(body.error).toEqual("Bad Request");
	});
});
