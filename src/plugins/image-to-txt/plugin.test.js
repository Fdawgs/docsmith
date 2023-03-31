/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const plugin = require(".");
const getConfig = require("../../config");

describe("Image-to-TXT conversion plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify({ pluginTimeout: 30000 });

		server.addContentTypeParser(
			"image/png",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(plugin, config.tesseract);

		server.post("/", async (req, res) => {
			res.header("content-type", "text/plain, charset=utf-8");

			const {
				data: { text },
			} = await server.tesseract.addJob("recognize", req.body);

			return text;
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should read text from image file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_bullet_issues001.png"
			),
			headers: {
				"content-type": "image/png",
			},
		});

		expect(response.body).toMatch("Super Test Hospital");
		expect(isHtml(response.body)).toBe(false);
		expect(response.statusCode).toBe(200);
	});
});
