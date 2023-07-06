const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const plugin = require(".");
const getConfig = require("../../config");

describe("Embed-HTML-Images plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser(
			"text/html",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);
	});

	afterEach(async () => {
		await server.close();
	});

	it("Embeds images into HTML", async () => {
		const altConfig = await getConfig();
		altConfig.poppler.tempDir = "./test_resources/test_files/";
		server.post("/", async (req) => {
			const result = await server.embedHtmlImages(req.body);
			return result;
		});
		await server.register(plugin, altConfig.poppler).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/html_valid_bullet_issues.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);

		expect(isHtml(response.body)).toBe(true);
		dom.window.document.querySelectorAll("img").forEach((image) => {
			expect(image.src).toMatch(/^data:image\/(jp[e]?g|png);base64/iu);
		});
		expect(response.statusCode).toBe(200);
	});

	it("Throws error if it cannot find images to embed in specified directory", async () => {
		server.post("/", async (req) => {
			const result = await server.embedHtmlImages(req.body);
			return result;
		});
		await server.register(plugin, config.poppler).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/html_valid_bullet_issues.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(JSON.parse(response.body)).toStrictEqual({
			code: "ENOENT",
			errno: expect.any(Number),
			path: expect.any(String),
			syscall: "open",
		});
		expect(response.statusCode).toBe(500);
	});
});
