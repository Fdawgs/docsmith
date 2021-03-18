const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const plugin = require(".");
const getConfig = require("../../../config");

const embedHtmlImages = require("../../../plugins/embed-html-images");
const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

describe("PDF-to-HTML route", () => {
	let options;
	let server;

	// TODO Add afterall to remove leftover PDFs from ./temp

	beforeAll(async () => {
		options = await getConfig();

		server = Fastify()
			.register(embedHtmlImages, options)
			.register(tidyCss)
			.register(tidyHtml);
		server.register(plugin, options);

		await server.ready();
	});

	afterAll(() => {
		server.close();
	});

	test("Should return PDF file converted to HTML, with alt attributes removed from img tags", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				removeAlt: true,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		expect(response.statusCode).toEqual(200);
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should return 400 error code if file missing", async () => {
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
});
