const fs = require("fs/promises");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const isPdf = require("../../utils/is-pdf/index");

describe("HTML-to-PDF conversion plugin", () => {
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.addContentTypeParser(
			"text/html",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(sensible).register(plugin);

		server.post("/", (req, res) => {
			res.header("content-type", "application/json").send(
				req.conversionResults
			);
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should convert HTML file to PDF", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_html.html"
			),
			headers: {
				"content-type": "text/html",
			},
		});

		const body = JSON.parse(response.payload);

		expect(isPdf.buff(body.body.data)).toBe(true);

		expect(response.statusCode).toBe(200);
	});
});
