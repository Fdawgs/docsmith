"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const Fastify = require("fastify");
const plugin = require("../src/plugins/image-to-txt");
const getConfig = require("../src/config");

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

	afterAll(async () => server.close());

	it("Reads text from image file", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test/fixtures/png_valid_bullet_issues001.png"
			),
			headers: {
				"content-type": "image/png",
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.statusCode).toBe(200);
	});
});
