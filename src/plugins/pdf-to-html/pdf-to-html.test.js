/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("PDF-to-HTML conversion plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser("application/pdf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.post("/", (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.pdfToHtmlResults);
		});
	});

	afterEach(() => {
		server.close();
	});

	test("Should convert PDF file to HTML and place in specified directory", async () => {
		server.register(plugin, config);

		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: "2",
				ignoreImages: "false",
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(true);
		expect(typeof response.docLocation).toBe("object");
		expect(fs.existsSync(response.docLocation.html)).toBe(false);
		expect(fs.existsSync(config.poppler.tempDirectory)).toBe(true);
	});

	test("Should ignore invalid `test` query string params and convert PDF file to HTML", async () => {
		server.register(plugin, config);

		let response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				firstPageToConvert: "1",
				ignoreImages: "true",
				lastPageToConvert: "1",
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

		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(true);
		expect(typeof response.docLocation).toBe("object");
		expect(fs.existsSync(response.docLocation.html)).toBe(false);
		expect(fs.existsSync(config.poppler.tempDirectory)).toBe(true);
	});

	test("Should return HTTP 400 error if PDF file missing", async () => {
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/pdf",
			},
		});

		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(400);
		expect(response.statusMessage).toBe("Bad Request");
		expect(body.statusCode).toBe(400);
		expect(body.error).toBe("Bad Request");
	});
});
