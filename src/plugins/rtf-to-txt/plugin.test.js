/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const sensible = require("fastify-sensible");
const plugin = require(".");
const getConfig = require("../../config");

describe("RTF-to-TXT Conversion Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.unrtf.tempDirectory = "./src/temp4/";

		server = Fastify();

		server.addContentTypeParser("application/rtf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.register(sensible).register(plugin, config.unrtf);

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.conversionResults);
		});

		await server.ready();
	});

	afterAll(async () => {
		fs.rmSync(config.unrtf.tempDirectory, { recursive: true });
		await server.close();
	});

	test("Should convert RTF file to TXT and place in specified directory", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync("./test_resources/test_files/valid_rtf.rtf"),
			headers: {
				"content-type": "application/rtf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("Ask not what your country can do for you")
		);
		expect(isHtml(response.body)).toBe(false);
		expect(typeof response.docLocation).toBe("object");
		expect(fs.existsSync(response.docLocation.rtf)).toBe(false);
		expect(fs.existsSync(config.unrtf.tempDirectory)).toBe(true);
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
