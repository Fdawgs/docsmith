const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("DOC-to-TXT conversion plugin", () => {
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
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			body: await fs.readFile(filePath),
			headers,
		});

		const { body } = JSON.parse(response.body);

		// String found in header of the test document
		expect(body).toMatch(/^I am a header/);
		// String found in first heading of the test document
		expect(body).toMatch(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio."
		);
		// String found at end of the test document
		expect(body).toMatch(
			/Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien$/m
		);
		// String found in footer of the test document
		expect(body).toMatch(/I am a footer$/);
		expect(isHtml(body)).toBe(false);
		expect(response.statusCode).toBe(200);
	});

	// TODO: use `it.concurrent.each()` once it is no longer experimental
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
				headers,
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				body: filePath ? await fs.readFile(filePath) : undefined,
			});

			expect(JSON.parse(response.body)).toEqual({
				error: "Bad Request",
				message: "Bad Request",
				statusCode: 400,
			});
			expect(response.statusCode).toBe(400);
		}
	);
});
