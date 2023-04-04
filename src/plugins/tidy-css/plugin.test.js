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
			file: "valid_bullet_issues_html.html",
			expected: {
				// Original font-family of test file
				fonts: /font-family:Times/,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new font",
			file: "valid_bullet_issues_html.html",
			options: { fonts: "Arial" },
			expected: {
				fonts: /font-family:Arial/,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new font in quotation marks",
			file: "valid_bullet_issues_html.html",
			options: { fonts: 'Sans Serif, "Gill Sans"' },
			expected: {
				fonts: /Sans Serif","\\"Gill Sans\\"/,
			},
		},
		{
			testName: "Tidies CSS in HTML and sets new background color",
			file: "valid_bullet_issues_html.html",
			options: { backgroundColor: "white" },
			expected: {
				backgroundColor: /background-color:#fff/,
				// Original font-family of test file
				fonts: /font-family:Times/,
			},
		},
		{
			testName:
				"Tidies CSS in HTML, sets new background color, and sets new font",
			file: "valid_bullet_issues_html.html",
			options: { backgroundColor: "white", fonts: "Arial" },
			expected: {
				backgroundColor: /background-color:#fff/,
				fonts: /font-family:Arial/,
			},
		},
		{
			testName:
				"Creates new style element if none exist in HTML but query string params passed",
			file: "valid_empty_html.html",
			options: { fonts: "Arial", backgroundColor: "white" },
			expected: {
				fonts: /font-family:Arial/,
				backgroundColor: /background-color:#fff/,
			},
		},
		{
			testName:
				"Continues to parse style elements with no type attribute in HTML",
			file: "valid_no_style_type_html.html",
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
			body: await fs.readFile(`./test_resources/test_files/${file}`, {
				encoding: "UTF-8",
			}),
			headers: {
				"content-type": "text/html",
			},
		});

		const dom = new JSDOM(response.payload);
		const style = dom.window.document.querySelector("style");

		expect(isHtml(response.payload)).toBe(true);
		// Check font-family is set to expected value
		expect(style.innerHTML).toMatch(expected?.fonts || /./);
		// Check background-color is set to expected value
		expect(style.innerHTML).toMatch(expected?.backgroundColor || /./);
		// Check CSS is combined into one style tag
		expect(dom.window.document.querySelectorAll("style")).toHaveLength(1);
		// Check CSS is tidied and minified
		expect(style.innerHTML).not.toMatch(/;}|<!--|--!?>|\n|\r|\r\n/);
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
