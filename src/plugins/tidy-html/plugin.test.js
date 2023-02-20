const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("Tidy-CSS plugin", () => {
	let server;

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

	test("Should tidy HTML", async () => {
		server.post("/", async (req) => {
			const result = await server.tidyHtml(req.body);
			return result;
		});
		await server.register(sensible).register(plugin).ready();

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

		const dom = new JSDOM(response.payload);

		expect(
			dom.window.document.querySelector("html").getAttribute("lang")
		).toBe("en");
		expect(
			dom.window.document.querySelector("html").getAttribute("xml:lang")
		).toBe("en");
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should tidy HTML and set language", async () => {
		server.post("/", async (req) => {
			const result = await server.tidyHtml(req.body, { language: "fr" });
			return result;
		});
		await server.register(sensible).register(plugin).ready();

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

		const dom = new JSDOM(response.payload);

		expect(
			dom.window.document.querySelector("html").getAttribute("lang")
		).toBe("fr");
		expect(
			dom.window.document.querySelector("html").getAttribute("xml:lang")
		).toBe("fr");
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should return HTTP status code 400 if language querystring param is not valid IANA language tag", async () => {
		server.post("/", async (req) => {
			const result = await server.tidyHtml(req.body, {
				language: "en-Somerset",
			});
			return result;
		});
		await server.register(sensible).register(plugin).ready();

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
			statusCode: 400,
			error: "Bad Request",
			message: "querystring.language not a valid IANA language tag",
		});
		expect(response.statusCode).toBe(400);
	});

	test("Should set alt attribute in img tags to empty string", async () => {
		server.post("/", async (req) => {
			const result = await server.tidyHtml(req.body, { removeAlt: true });
			return result;
		});
		await server.register(sensible).register(plugin).ready();

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

		expect(/alt=""/gm.exec(response.payload)).not.toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});
});
