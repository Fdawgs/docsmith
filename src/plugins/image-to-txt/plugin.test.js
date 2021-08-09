/* eslint-disable security/detect-non-literal-fs-filename */
const { cloneDeep } = require("lodash");
const fs = require("fs");
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
		config = cloneDeep(config);

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
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should read text from image file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_bullet_issues001.png"
			),
			headers: {
				"content-type": "image/png",
			},
		});

		expect(response.body).toEqual(
			expect.stringContaining("Yeovil District Hospital")
		);
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(false);
	});
});
