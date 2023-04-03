const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("Tidy-HTML plugin", () => {
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

	// TODO: use `it.concurrent.each()` once it is no longer experimental
	it.each([
		{ testName: "Tidies HTML" },
		{
			testName: "Tidies HTML and set img alt attributes to empty string",
			options: { removeAlt: true },
		},
		{
			testName: "Tidies HTML and set language",
			options: { language: "fr" },
		},
		{
			testName:
				"Tidies HTML, set img alt attributes to empty string, and set language",
			options: { language: "fr", removeAlt: true },
		},
	])("$testName", async ({ options }) => {
		server.post("/", async (req) => {
			const result = await server.tidyHtml(req.body, options);
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

		expect(isHtml(response.payload)).toBe(true);
		// Check language is set to default or options.language
		expect(
			dom.window.document.querySelector("html").getAttribute("lang")
		).toBe(options?.language || "en");
		expect(
			dom.window.document.querySelector("html").getAttribute("xml:lang")
		).toBe(options?.language || "en");

		// Check alt attributes are removed if options.removeAlt is true
		dom.window.document.querySelectorAll("img").forEach((image) => {
			expect(image.alt).toBe(
				options?.removeAlt ? "" : "background image"
			);
		});

		// Check smart quotes and em dashes are replaced with ASCII equivalents
		expect(dom.window.document.body.textContent).not.toMatch(/“|”|‘|’|—/);
		// Check `&nbsp;` is replaced with spaces
		expect(dom.window.document.body.textContent).not.toMatch("&nbsp;");
		// Check legacy HTML elements are removed
		expect(dom.window.document.querySelector("center")).toBeNull();
		expect(dom.window.document.querySelector("font")).toBeNull();
		// Check `<![CDATA[]]>` is escaped
		expect(dom.window.document.head.textContent).toMatch("/*<![CDATA[*/");
		// Check HTML comments are removed
		expect(dom.window.document.body.textContent).not.toMatch(/<!--|--!?>/);
		// Check HTML is minified
		expect(dom.window.document.body.textContent).not.toMatch(/\n|\r|\r\n/);
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if language querystring param is not valid IANA language tag", async () => {
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
});
