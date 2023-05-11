/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
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
			fs.rm(config.unrtf.tempDir, { recursive: true }),
			server.close(),
		]);
	});

	// TODO: fix rtf-to-html plugin to include header and footer
	it.failing("Converts RTF file to HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_rtf.rtf"
			),
			headers: {
				"content-type": "application/rtf",
			},
		});

		const { body, docLocation } = JSON.parse(response.payload);
		const dom = new JSDOM(body);

		expect(body).not.toMatch(artifacts);
		expect(isHtml(body)).toBe(true);
		// Check that head element contains only a meta and title element in the correct order
		expect(dom.window.document.head.firstChild.tagName).toBe("META");
		expect(dom.window.document.head.firstChild).toMatchObject({
			content: expect.stringMatching(/^text\/html; charset=utf-8$/i),
			httpEquiv: expect.stringMatching(/^content-type$/i),
		});
		expect(
			dom.window.document.head.querySelector("title").textContent
		).toMatch(/^docsmith_rtf-to-html_/);
		// Check all images are removed
		expect(dom.window.document.querySelectorAll("img")).toHaveLength(0);
		// Check the body contains no links and has not removed any link inner text
		expect(dom.window.document.querySelectorAll("a")).toHaveLength(0);
		expect(dom.window.document.body.textContent).toMatch(
			"Mauris id ex erat"
		);
		// String found in header of the test document
		expect(body).toMatch("I am a header");
		// String found at beginning of body of the test document
		expect(dom.window.document.body.textContent).toMatch(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio."
		);
		// String found at end of body of the test document
		expect(dom.window.document.body.textContent).toMatch(
			"Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien"
		);
		// String found in footer of the test document
		expect(body).toMatch("I am a footer");
		// Check the docLocation object contains the expected properties
		expect(docLocation).toMatchObject({
			directory: expect.any(String),
			rtf: expect.stringMatching(/.rtf$/i),
			id: expect.stringMatching(/^docsmith_rtf-to-html_/),
		});
		// Check the RTF file has been removed from the temp directory
		await expect(fs.readFile(docLocation.rtf)).rejects.toThrow();
		await expect(fs.readdir(config.unrtf.tempDir)).resolves.toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});

	// TODO: use `it.concurrent.each()` once it is no longer experimental
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid RTF file",
			readFile: true,
		},
	])(
		"Returns HTTP status code 400 if RTF file $testName",
		async ({ readFile }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				headers: {
					"content-type": "application/rtf",
				},
				body: readFile
					? await fs.readFile(
							"./test_resources/test_files/invalid_rtf.rtf"
					  )
					: undefined,
			});

			expect(JSON.parse(response.payload)).toEqual({
				error: "Bad Request",
				message: "Bad Request",
				statusCode: 400,
			});
			expect(response.statusCode).toBe(400);
		}
	);
});
