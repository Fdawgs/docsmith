"use strict";

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

	// TODO: use `it.concurrent.each()` once it is no longer experimental
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
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			body: await fs.readFile(`./test_resources/test_files/${file}`),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.body);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.body)).toBe(true);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check font-family is set to expected value
		expect(style.innerHTML).toMatch(expected?.fonts || /./u);
		// Check background-color is set to expected value
		expect(style.innerHTML).toMatch(expected?.backgroundColor || /./u);
		// Check page-break-inside is set to avoid
		expect(style.innerHTML).toMatch(
			file !== "html_valid_no_style_type.html"
				? /page-break-inside:avoid/u
				: /./u
		);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;\}|<!--|--!?>|\n|\r/u);
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
			body: await fs.readFile(
				"./test_resources/test_files/html_valid_empty.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(isHtml(response.body)).toBe(true);
		expect(response.statusCode).toBe(200);
	});
});
