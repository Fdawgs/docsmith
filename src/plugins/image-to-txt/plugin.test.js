/* eslint-disable security/detect-non-literal-fs-filename */

"use strict";

const { readFile } = require("node:fs/promises");
const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

describe("Image-to-TXT conversion plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.tesseract.workers = 1;

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

	it("Reads text from image file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/png_valid_bullet_issues001.png"
			),
			headers: {
				"content-type": "image/png",
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.statusCode).toBe(200);
	});
});
