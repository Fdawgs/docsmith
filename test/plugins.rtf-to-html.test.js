/* eslint-disable security/detect-non-literal-fs-filename -- Test filenames are not user-provided */

"use strict";

const { readFile, readdir, rm } = require("node:fs/promises");
const {
	afterAll,
	beforeAll,
	describe,
	expect,
	it,
	jest,
} = require("@jest/globals");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const { UnRTF } = require("node-unrtf");
const plugin = require("../src/plugins/rtf-to-html");
const getConfig = require("../src/config");

/**
 * Used to check that common incorrectly converted Windows-1252
 * to UTF-8 values are removed by the fix-latin1-to-utf8` module.
 */
const artifacts =
	/â‚¬|â€[šž¦¡°¹˜™œ¢“”]|Æ’|Ë[†œ]|Å[½¡¾¸]|Â[¯·´°]|ï‚·|âˆš|[�Â]|Ã[‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿]|â‰[¤¥]|Ã|â€/gu;

describe("RTF-to-HTML conversion plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config.unrtf.tempDir = "./temp-test-rtf-to-html/";

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

	afterAll(async () =>
		Promise.all([
			rm(config.unrtf.tempDir, { recursive: true }),
			server.close(),
		])
	);

	/** @todo Fix rtf-to-html plugin to include header and footer. */
	it("Converts RTF file to HTML", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/rtf_valid.rtf"),
			headers: {
				"content-type": "application/rtf",
			},
		});

		const { body, docLocation } = response.json();
		const dom = new JSDOM(body);

		expect(body).not.toMatch(artifacts);
		expect(isHtml(body)).toBe(true);
		// Check that head element contains only a meta and title element in the correct order
		expect(dom.window.document.head.children[0].tagName).toBe("META");
		expect(dom.window.document.head.firstChild).toMatchObject({
			content: expect.stringMatching(/^text\/html; charset=utf-8$/iu),
			httpEquiv: expect.stringMatching(/^content-type$/iu),
		});
		expect(
			dom.window.document.head.querySelector("title")?.textContent
		).toMatch(/^docsmith_rtf-to-html_/u);
		// Check all images are removed
		expect(dom.window.document.querySelectorAll("img")).toHaveLength(0);
		// Check the body contains no links and has not removed any link inner text
		expect(dom.window.document.querySelectorAll("a")).toHaveLength(0);
		expect(dom.window.document.body.textContent).toMatch(
			"Mauris id ex erat"
		);
		// String found in header of the test document
		/** @todo Fix rtf-to-html plugin to include header. */
		// expect(body).toMatch("I am a header");
		// String found at beginning of body of the test document
		expect(dom.window.document.body.textContent).toMatch(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio."
		);
		// String found at end of body of the test document
		expect(dom.window.document.body.textContent).toMatch(
			"Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien"
		);
		// String found in footer of the test document
		/** @todo Fix rtf-to-html plugin to include footer. */
		// expect(body).toMatch("I am a footer");
		// Check the docLocation object contains the expected properties
		expect(docLocation).toMatchObject({
			directory: expect.any(String),
			rtf: expect.stringMatching(/.rtf$/iu),
			id: expect.stringMatching(/^docsmith_rtf-to-html_/u),
		});
		// Check the RTF file has been removed from the temp directory
		await expect(readFile(docLocation.rtf)).rejects.toThrow();
		await expect(readdir(config.unrtf.tempDir)).resolves.toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});

	/** @todo Use `it.concurrent.each()` once it is no longer experimental. */
	it.each([
		{ testName: "is missing" },
		{ testName: "is empty", body: Buffer.alloc(0) },
		{
			testName: "is not a valid RTF file",
			body: Buffer.from("test"),
		},
	])("Returns HTTP status code 400 if body $testName", async ({ body }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body,
			headers: {
				"content-type": "application/rtf",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Bad Request",
			message: "Bad Request",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});

	it("Returns HTTP status code 400 if unrtf.convert() throws an error", async () => {
		const mockUnrtf = jest
			.spyOn(UnRTF.prototype, "convert")
			.mockRejectedValue(new Error("test error"));

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test/files/rtf_valid.rtf"),
			headers: {
				"content-type": "application/rtf",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Internal Server Error",
			message: "test error",
			statusCode: 500,
		});
		expect(response.statusCode).toBe(500);

		mockUnrtf.mockRestore();
	});
});
