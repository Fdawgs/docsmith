/* eslint-disable security/detect-non-literal-fs-filename -- Test files are not user-provided */

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
const plugin = require("../src/plugins/tidy-css");
const getConfig = require("../src/config");

describe("Tidy-CSS plugin", () => {
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

	/** @todo Use `it.concurrent.each()` once it is no longer experimental. */
	it.each([
		{
			testName: "Tidies CSS in HTML",
			file: "html_valid_bullet_issues.html",
			expected: {
				// Original font-family of test file
				fonts: /font-family:Times/u,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new font",
			file: "html_valid_bullet_issues.html",
			options: { fonts: "Arial" },
			expected: {
				fonts: /font-family:Arial/u,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new font in quotation marks",
			file: "html_valid_bullet_issues.html",
			options: { fonts: 'Sans Serif, "Gill Sans"' },
			expected: {
				fonts: /Sans Serif","\\"Gill Sans\\"/u,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new background color",
			file: "html_valid_bullet_issues.html",
			options: { backgroundColor: "white" },
			expected: {
				backgroundColor: /background-color:#fff/u,
				// Original font-family of test file
				fonts: /font-family:Times/u,
			},
		},
		{
			testName:
				"Tidies CSS in HTML, sets new background color, and sets new font",
			file: "html_valid_bullet_issues.html",
			options: { backgroundColor: "white", fonts: "Arial" },
			expected: {
				backgroundColor: /background-color:#fff/u,
				fonts: /font-family:Arial/u,
			},
		},
		{
			testName:
				"Creates new style element if none exist in HTML but query string params passed",
			file: "html_valid_empty.html",
			options: { fonts: "Arial", backgroundColor: "white" },
			expected: {
				fonts: /font-family:Arial/u,
				backgroundColor: /background-color:#fff/u,
			},
		},
		{
			testName:
				"Continues to parse style elements with no type attribute in HTML",
			file: "html_valid_no_style_type.html",
		},
	])("$testName", async ({ expected, file, options }) => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body, options));
		});
		await server.register(plugin).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(`./test/fixtures/${file}`),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);
		const style = dom.window.document.querySelector("style");

		expect(response.body).toMatchSnapshot();
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check font-family is set to expected value
		expect(style?.textContent).toMatch(expected?.fonts || /./u);
		// Check background-color is set to expected value
		expect(style?.textContent).toMatch(expected?.backgroundColor || /./u);
		// Check page-break-inside is set to avoid
		expect(style?.textContent).toMatch(/page-break-inside:avoid/u);
		// Check CSS is tidied and minified
		expect(style?.textContent).not.toMatch(/;\}|<!--|--!?>|\n|\r/u);
		expect(response.statusCode).toBe(200);
	});

	it("Tidies CSS in HTML that uses @ rules", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		await server.register(plugin).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test/fixtures/html_valid_css_at_rules.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);
		const style = dom.window.document.querySelector("style");

		expect(response.body).toMatchSnapshot();
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style?.textContent).not.toMatch(/;\}|<!--|--!?>|\n|\r/u);
		expect(response.statusCode).toBe(200);
	});

	it("Continues if it cannot find any CSS in HTML to tidy", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		await server.register(plugin, config).ready();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/fixtures/html_valid_empty.html"),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.statusCode).toBe(200);
	});
});
