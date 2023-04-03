const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const plugin = require(".");
const getConfig = require("../../config");

describe("Tidy-CSS plugin", () => {
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

	it("Tidies CSS in HTML", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		await server.register(plugin).ready();

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
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Tidies CSS in HTML and set new font", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body, { fonts: "Arial" }));
		});
		await server.register(plugin).ready();

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

		expect(response.payload).toMatch(/font-family:Arial/);

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Tidies CSS in HTML and set new font in quotation marks", async () => {
		server.post("/", (req, res) => {
			res.send(
				server.tidyCss(req.body, { fonts: 'Sans Serif, "Gill Sans"' })
			);
		});
		await server.register(plugin).ready();

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

		expect(response.payload).toMatch(
			/font-family:"Sans Serif","\\"Gill Sans\\""/
		);

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Tidies CSS in HTML and set new background color", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body, { backgroundColor: "white" }));
		});
		await server.register(plugin).ready();

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

		expect(response.payload).toMatch(/background-color:#fff/);

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Creates new style element if none exist but query string param passed", async () => {
		server.post("/", (req, res) => {
			res.send(
				server.tidyCss(req.body, {
					fonts: "Arial",
					backgroundColor: "white",
				})
			);
		});
		await server.register(plugin, config).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_empty_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.payload).toMatch(/font-family:Arial/);
		expect(response.payload).toMatch(/background-color:#fff/);

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Continues to parse style elements with no type attribute", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		await server.register(plugin, config).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_empty_style_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Continues if it cannot find any CSS to tidy", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		await server.register(plugin, config).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_empty_html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});
});
