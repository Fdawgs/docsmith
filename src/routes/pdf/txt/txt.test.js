const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const plugin = require(".");
const getConfig = require("../../../config");

describe("PDF-to-TXT route", () => {
	let options;
	let server;

	beforeAll(async () => {
		options = await getConfig();

		server = Fastify();
		server.register(plugin, options);

		await server.ready();
	});

	afterAll(() => {
		server.close();
	});

	test("Should return PDF file converted to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(response.payload).toEqual(
			expect.stringContaining("The NHS Constitution")
		);
		expect(response.statusCode).toEqual(200);
		expect(isHtml(response.payload)).toBe(false);
	});

	test("Should return 415 error code if file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(response.statusCode).toEqual(415);
		expect(response.statusMessage).toEqual("Unsupported Media Type");
	});

	test("Should return 415 error code if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/empty-test.html"
			),
			headers: {
				"content-type": "application/html",
			},
		});

		expect(response.statusCode).toEqual(415);
		expect(response.statusMessage).toEqual("Unsupported Media Type");
	});
});
