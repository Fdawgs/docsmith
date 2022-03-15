/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs").promises;
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("Image-To-TXT Conversion Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();

		server.addContentTypeParser("image/png", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.register(plugin, config.tesseract);

		server.post("/", async (req, res) => {
			res.header("content-type", "text/plain, charset=utf-8");

			const {
				data: { text },
			} = await server.tesseract.addJob("recognize", req.body);

			res.send(text);
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

		expect(response.body).toEqual(
			expect.stringContaining("Yeovil District Hospital")
		);
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(false);
		expect(response.statusCode).toBe(200);
	});
});
