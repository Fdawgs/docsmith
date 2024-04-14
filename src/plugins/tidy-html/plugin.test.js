"use strict";

const { readFile } = require("node:fs/promises");
const Fastify = require("fastify");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("Tidy-HTML plugin", () => {
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser(
			"text/html",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);
	});

	afterEach(async () => server.close());

	/** @todo Use `it.concurrent.each()` once it is no longer experimental. */
	it.each([
		{ testName: "Tidies HTML" },
		{
			testName: "Tidies HTML and sets img alt attributes to empty string",
			options: { removeAlt: true },
		},
		{
			testName: "Tidies HTML and sets language",
			options: { language: "fr" },
		},
		{
			testName:
				"Tidies HTML, sets img alt attributes to empty string, and sets language",
			options: { language: "fr", removeAlt: true },
		},
		{
			testName:
				"Tidies HTML and removes elements with `display: none` or `visibility: hidden` styles",
			options: { removeHidden: true },
		},
	])("$testName", async ({ options }) => {
		server.post("/", async (req) => server.tidyHtml(req.body, options));
		await server.register(sensible).register(plugin).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/html_valid_bullet_issues.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);

		expect(response.body).toMatchSnapshot();
		// Check language is set to default or options.language
		expect(
			dom.window.document.querySelector("html")?.getAttribute("lang")
		).toBe(options?.language || "en");
		expect(
			dom.window.document.querySelector("html")?.getAttribute("xml:lang")
		).toBe(options?.language || "en");

		// Check alt attributes are removed if options.removeAlt is true
		dom.window.document.querySelectorAll("img").forEach((image) => {
			expect(image.alt).toBe(
				options?.removeAlt ? "" : "background image"
			);
		});

		// Check smart quotes and em dashes are replaced with ASCII equivalents
		expect(dom.window.document.body.textContent).not.toMatch(/[—‘’“”]/u);
		// Check `&nbsp;` is replaced with spaces
		expect(dom.window.document.body.textContent).not.toMatch("&nbsp;");
		// Check legacy HTML elements are removed
		expect(dom.window.document.querySelector("center")).toBeNull();
		expect(dom.window.document.querySelector("font")).toBeNull();
		// Check `<![CDATA[]]>` is escaped or removed
		expect(dom.window.document.head.textContent).not.toMatch(
			/(?<!\/\*)<!\[CDATA\[(?!\*\/)/u
		);
		// Check HTML comments are removed
		expect(dom.window.document.body.textContent).not.toMatch(/<!--|--!?>/u);
		// Check HTML is minified
		expect(dom.window.document.body.textContent).not.toMatch(/\n|\r/u);
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if language querystring param is not valid IANA language tag", async () => {
		server.post("/", async (req) =>
			server.tidyHtml(req.body, {
				language: "en-Somerset",
			})
		);
		await server.register(sensible).register(plugin).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/html_valid_bullet_issues.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.json()).toStrictEqual({
			statusCode: 400,
			error: "Bad Request",
			message: "querystring.language not a valid IANA language tag",
		});
		expect(response.statusCode).toBe(400);
	});
});
