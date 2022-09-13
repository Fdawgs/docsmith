const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("Tidy-CSS Plugin", () => {
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

	test("Should tidy CSS in HTML", async () => {
		server.post("/", async (req) => server.tidyCss(req.body));
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

		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should tidy CSS in HTML and set new font", async () => {
		server.post("/", async (req) =>
			server.tidyCss(req.body, { fonts: "Arial" })
		);
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

		expect(/font-family:Arial/gm.exec(response.payload)).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should tidy CSS in HTML and set new font in quotation marks", async () => {
		server.post("/", async (req) =>
			server.tidyCss(req.body, {
				fonts: 'Sans Serif, "Gill Sans"',
			})
		);
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

		expect(
			/font-family:"Sans Serif","\\"Gill Sans\\""/gm.exec(
				response.payload
			)
		).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should tidy CSS in HTML and set new background color", async () => {
		server.post("/", async (req) =>
			server.tidyCss(req.body, { backgroundColor: "white" })
		);
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

		expect(/background-color:#fff/gm.exec(response.payload)).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should create new style element if none exist but query string param passed", async () => {
		server.post("/", async (req) =>
			server.tidyCss(req.body, {
				fonts: "Arial",
				backgroundColor: "white",
			})
		);
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

		expect(/font-family:Arial/gm.exec(response.payload)).not.toBeNull();
		expect(/background-color:#fff/gm.exec(response.payload)).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should continue to parse style elements with no type attribute", async () => {
		server.post("/", async (req) => server.tidyCss(req.body));
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

		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test("Should continue if it cannot find any CSS to tidy", async () => {
		server.post("/", async (req) => server.tidyCss(req.body));
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

		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
		expect(response.statusCode).toBe(200);
	});
});
