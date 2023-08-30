"use strict";

const { readFile } = require("node:fs/promises");
const Fastify = require("fastify");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("DOCX-to-HTML conversion plugin", () => {
	/**
	 * @type {Fastify.FastifyInstance}
	 */
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.addContentTypeParser(
			[
				"application/vnd.ms-word.document.macroEnabled.12",
				"application/vnd.ms-word.template.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			],
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(sensible).register(plugin);

		server.post("/", (req, res) => {
			res.header("content-type", "application/json").send(
				req.conversionResults
			);
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	it.each([
		{
			testName: "DOCM file",
			filePath: "./test_resources/test_files/docm_valid.docm",
			headers: {
				"content-type":
					"application/vnd.ms-word.document.macroEnabled.12",
			},
		},
		{
			testName: "DOCX file",
			filePath: "./test_resources/test_files/docx_valid.docx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		},
		{
			testName: "DOTX file",
			filePath: "./test_resources/test_files/dotx_valid.dotx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		},
		{
			testName: "DOTM file",
			filePath: "./test_resources/test_files/dotm_valid.dotm",
			headers: {
				"content-type":
					"application/vnd.ms-word.template.macroEnabled.12",
			},
		},
	])("Converts $testName to HTML", async ({ filePath, headers }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			body: await readFile(filePath),
			headers,
		});

		const { body } = JSON.parse(response.body);
		const dom = new JSDOM(body);

		expect(
			response.body.replace(
				/<title>[-\w]+<\/title>/gu,
				"<title>docsmith</title>"
			)
		).toMatchSnapshot();
		// Expect all images to be embedded
		dom.window.document.querySelectorAll("img").forEach((image) => {
			expect(image.src).toMatch(/^data:image\/(?:jpe?g|png);base64/iu);
		});
		expect(response.statusCode).toBe(200);
	});

	// TODO: use `it.concurrent.each()` once it is no longer experimental
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid DOCM file",
			filePath: "./test_resources/test_files/docm_invalid.docm",
			headers: {
				"content-type":
					"application/vnd.ms-word.document.macroEnabled.12",
			},
		},
		{
			testName: "is not a valid DOCX file",
			filePath: "./test_resources/test_files/docx_invalid.docx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		},
		{
			testName: "is not a valid DOTM file",
			filePath: "./test_resources/test_files/dotm_invalid.dotm",
			headers: {
				"content-type":
					"application/vnd.ms-word.template.macroEnabled.12",
			},
		},
		{
			testName: "is not a valid DOTX file",
			filePath: "./test_resources/test_files/dotx_invalid.dotx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		},
	])(
		"Returns HTTP status code 400 if file $testName",
		async ({ filePath, headers }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				body: filePath ? await readFile(filePath) : undefined,
				headers,
			});

			expect(JSON.parse(response.body)).toStrictEqual({
				error: "Bad Request",
				message: "Bad Request",
				statusCode: 400,
			});
			expect(response.statusCode).toBe(400);
		}
	);
});
