const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const raw = require("raw-body");
const sensible = require("fastify-sensible");
const plugin = require(".");

describe("Tidy-CSS Plugin", () => {
	let server;

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

	test("Should tidy HTML", async () => {
		server.post("/", async (req, res) => {
			res.send(await server.tidyHtml(req.body));
		});
		server.register(sensible).register(plugin);

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
		server.post("/", async (req, res) => {
			res.send(await server.tidyHtml(req.body, { language: "fr" }));
		});
		server.register(sensible).register(plugin);

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
		server.post("/", async (req, res) => {
			res.send(
				await server.tidyHtml(req.body, { language: "en-Somerset" })
			);
		});
		server.register(sensible).register(plugin);

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

		expect(JSON.parse(response.payload)).toEqual({
			statusCode: 400,
			error: "Bad Request",
			message: "querystring.language not a valid IANA language tag",
		});
		expect(response.statusCode).toBe(400);
	});

	test("Should remove alt attribute from img tags", async () => {
		server.post("/", async (req, res) => {
			res.send(await server.tidyHtml(req.body, { removeAlt: true }));
		});
		server.register(sensible).register(plugin);

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

		expect(/alt=""/gm.exec(response.payload)).not.toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});
});
