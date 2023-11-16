/* eslint-disable security/detect-non-literal-fs-filename -- Test files are not user-provided */

"use strict";

const { readFile } = require("node:fs/promises");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("DOC-to-TXT conversion plugin", () => {
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.addContentTypeParser(
			[
				"application/msword",
				"application/vnd.ms-word.document.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			],
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);

		await server.register(sensible).register(plugin);

		server.post("/", async (req, res) => {
			res.type("text/plain; charset=utf-8");
			return server.docToTxt(req.body);
		});

		await server.ready();
	});

	afterAll(async () => server.close());

	it.each([
		{
			testName: "DOC file",
			filePath: "./test_resources/test_files/doc_valid.doc",
			headers: {
				"content-type": "application/msword",
			},
		},
		{
			testName: "DOT file",
			filePath: "./test_resources/test_files/dot_valid.dot",
			headers: {
				"content-type": "application/msword",
			},
		},
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
	])("Converts $testName to TXT", async ({ filePath, headers }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(filePath),
			headers,
		});

		expect(response.body).toMatchSnapshot();
		expect(response.statusCode).toBe(200);
	});

	/** @todo use `it.concurrent.each()` once it is no longer experimental */
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid DOC file",
			headers: {
				"content-type": "application/msword",
			},
			filePath: "./test_resources/test_files/doc_invalid.doc",
		},
		{
			testName: "is not a valid DOT file",
			headers: {
				"content-type": "application/msword",
			},
			filePath: "./test_resources/test_files/dot_invalid.dot",
		},
		{
			testName: "is not a valid DOCM file",
			headers: {
				"content-type":
					"application/vnd.ms-word.document.macroEnabled.12",
			},
			filePath: "./test_resources/test_files/docm_invalid.docm",
		},
		{
			testName: "is not a valid DOCX file",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
			filePath: "./test_resources/test_files/docx_invalid.docx",
		},
	])(
		"Returns HTTP status code 400 if file $testName",
		async ({ filePath, headers }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
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
