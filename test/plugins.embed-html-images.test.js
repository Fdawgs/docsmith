"use strict";

const { readFile } = require("node:fs/promises");
const {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} = require("@jest/globals");
const Fastify = require("fastify");
const { JSDOM } = require("jsdom");
const plugin = require("../src/plugins/embed-html-images");
const getConfig = require("../src/config");

describe("Embed-HTML-Images plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
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

	afterEach(async () => server.close());

	it("Embeds images into HTML", async () => {
		const altConfig = await getConfig();
		altConfig.poppler.tempDir = "./test/files/";
		server.post("/", async (req) => server.embedHtmlImages(req.body));
		await server.register(plugin, altConfig.poppler).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/html_valid_bullet_issues.html"),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);

		expect(response.body).toMatchSnapshot();
		for (const image of dom.window.document.querySelectorAll("img")) {
			expect(image.src).toMatch(/^data:image\/(?:jpe?g|png);base64/iu);
		}
		expect(response.statusCode).toBe(200);
	});

	it("Throws an error if it cannot find images to embed in specified directory", async () => {
		server.post("/", async (req) => server.embedHtmlImages(req.body));
		await server.register(plugin, config.poppler).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/html_valid_bullet_issues.html"),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.json()).toStrictEqual({
			code: "ENOENT",
			errno: expect.any(Number),
			path: expect.any(String),
			syscall: "open",
		});
		expect(response.statusCode).toBe(500);
	});
});
