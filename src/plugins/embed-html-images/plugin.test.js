const { cloneDeep } = require("lodash");
const fs = require("fs");
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
		server.post("/", (req, res) => {
			res.send(server.embedHtmlImages(req.body));
		});
		server.register(plugin, altConfig);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
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
		expect(typeof response.payload).toEqual("string");
		expect(isHtml(response.payload)).toEqual(true);
	});

	test("Should embed images into HTML and remove alt attribute from img tags", async () => {
		const altConfig = cloneDeep(config);
		altConfig.poppler.tempDirectory = "./test_resources/test_files/";
		server.post("/", (req, res) => {
			res.send(server.embedHtmlImages(req.body, true));
		});
		server.register(plugin, altConfig);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
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
		expect(/alt=""/gm.exec(response.payload)).not.toBeNull();
		expect(typeof response.payload).toEqual("string");
		expect(isHtml(response.payload)).toEqual(true);
	});

	test("Should embed images into HTML and add trailing slash if missing from directory", async () => {
		const altConfig = cloneDeep(config);
		altConfig.poppler.tempDirectory = "./test_resources/test_files";
		server.post("/", (req, res) => {
			res.send(server.embedHtmlImages(req.body));
		});
		server.register(plugin, altConfig);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
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
		expect(typeof response.payload).toEqual("string");
		expect(isHtml(response.payload)).toEqual(true);
	});

	test("Should continue if it cannot find images to embed in specified directory", async () => {
		server.post("/", (req, res) => {
			res.send(server.embedHtmlImages(req.body, true));
		});
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_bullet_issues_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(typeof response.payload).toEqual("string");
		expect(isHtml(response.payload)).toEqual(true);
	});
});
