const fs = require("fs");
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
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		server.register(plugin);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/tester_bullet_issues-html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should tidy CSS in HTML and set new font", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body, { fonts: "Arial" }));
		});
		server.register(plugin);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/tester_bullet_issues-html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(/font-family: Arial/gm.exec(response.payload)).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should tidy CSS in HTML and set new background color", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body, { backgroundColor: "white" }));
		});
		server.register(plugin);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/tester_bullet_issues-html.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(
			/background-color: white/gm.exec(response.payload)
		).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should continue to parse style elements with no type attribute", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/empty-test-style.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(/;}|<!--|-->/gm.exec(response.payload)).toBeNull();
		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});

	test("Should continue if it cannot find any CSS to tidy", async () => {
		server.post("/", (req, res) => {
			res.send(server.tidyCss(req.body));
		});
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/empty-test.html",
				{ encoding: "UTF-8" }
			),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(typeof response.payload).toBe("string");
		expect(isHtml(response.payload)).toBe(true);
	});
});
