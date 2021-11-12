const { cloneDeep } = require("lodash");
const fs = require("fs").promises;
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("Embed-HTML-Images Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser("text/html", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});
	});

	afterEach(async () => {
		await server.close();
	});

	test("Should embed images into HTML", async () => {
		const altConfig = cloneDeep(config);
		altConfig.poppler.tempDirectory = "./test_resources/test_files/";
		server.post("/", async (req, res) => {
			res.send(await server.embedHtmlImages(req.body));
		});
		server.register(plugin, altConfig.poppler);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_bullet_issues_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(
			/src="valid_bullet_issues001.png"/gm.exec(response.payload)
		).toBeNull();
		expect(/alt=""/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should embed images into HTML and add trailing slash if missing from directory", async () => {
		const altConfig = cloneDeep(config);
		altConfig.poppler.tempDirectory = "./test_resources/test_files";
		server.post("/", async (req, res) => {
			res.send(await server.embedHtmlImages(req.body));
		});
		server.register(plugin, altConfig.poppler);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_bullet_issues_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(
			/src="valid_bullet_issues001.png"/gm.exec(response.payload)
		).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should throw error if it cannot find images to embed in specified directory", async () => {
		server.post("/", async (req, res) => {
			res.send(await server.embedHtmlImages(req.body));
		});
		server.register(plugin, config.poppler);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_bullet_issues_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			code: "ENOENT",
			errno: expect.any(Number),
			path: expect.any(String),
			syscall: expect.any(String),
		});
		expect(response.statusCode).toBe(500);
	});
});
