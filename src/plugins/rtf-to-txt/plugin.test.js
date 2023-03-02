/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");

describe("RTF-to-TXT conversion plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.unrtf.tempDir = "./src/temp-test-rtf-to-txt/";

		server = Fastify();

		server.addContentTypeParser(
			"application/rtf",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(sensible).register(plugin, config.unrtf);

		server.post("/", (req, res) => {
			res.header("content-type", "application/json").send(
				req.conversionResults
			);
		});

		await server.ready();
	});

	afterAll(async () => {
		await Promise.all([
			fs.promises.rm(config.unrtf.tempDir, { recursive: true }),
			server.close(),
		]);
	});

	test("Should convert RTF file to TXT and place in specified directory", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.promises.readFile(
				"./test_resources/test_files/valid_rtf_simple.rtf"
			),
			headers: {
				"content-type": "application/rtf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("Ask not what your country can do for you")
		);
		expect(isHtml(response.body)).toBe(false);
		expect(response.docLocation).toEqual(
			expect.objectContaining({
				directory: expect.any(String),
				rtf: expect.any(String),
				id: expect.any(String),
			})
		);
		expect(fs.existsSync(response.docLocation.rtf)).toBe(false);
		expect(fs.existsSync(config.unrtf.tempDir)).toBe(true);
	});

	test("Should return HTTP status code 400 if RTF file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/rtf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Bad Request",
			message: "Bad Request",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});
});
