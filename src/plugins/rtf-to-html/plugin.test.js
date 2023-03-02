/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const Fastify = require("fastify");
const { JSDOM } = require("jsdom");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");
const getConfig = require("../../config");

/**
 * Used to check that common incorrectly converted Windows-1252
 * to UTF-8 values are removed by the `fix-utf8` module
 */
const artifacts =
	/â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥|Â|Ã|â€|�/g;

describe("RTF-to-HTML conversion plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.unrtf.tempDir = "./src/temp-test-rtf-to-html/";

		server = Fastify({ bodyLimit: 10485760 });

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

	test("Should convert RTF file to HTML and place in specified directory", async () => {
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
		expect(response.body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(response.body)).toBe(true);
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

	test("Should convert RTF file to HTML, with images removed, and place in specified directory", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.promises.readFile(
				"./test_resources/test_files/valid_rtf_complex.rtf"
			),
			headers: {
				"content-type": "application/rtf",
			},
		});

		response = JSON.parse(response.payload);
		const dom = new JSDOM(response);

		expect(response.body).toEqual(
			expect.stringContaining(
				"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
			)
		);
		expect(response.body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(response.body)).toBe(true);
		expect(dom.window.document.querySelectorAll("img")).toHaveLength(0);
		expect(typeof response.docLocation).toBe("object");
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
