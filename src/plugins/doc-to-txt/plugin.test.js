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
			"application/msword",
			{ parseAs: "buffer" },
			async (_req, payload) => payload
		);
		server.addContentTypeParser(
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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
			testName: "DOC file to TXT",
			headers: {
				"content-type": "application/msword",
			},
			readFile: "./test_resources/test_files/doc_valid.doc",
		},
		{
			testName: "DOCX file to TXT",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
			readFile: "./test_resources/test_files/docx_valid.docx",
		},
	])("Converts $testName", async ({ headers, readFile }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			body: await fs.readFile(readFile),
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
			readFile: "./test_resources/test_files/doc_invalid.doc",
		},
		{
			testName: "is not a valid DOCX file",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
			readFile: "./test_resources/test_files/docx_invalid.docx",
		},
	])(
		"Returns HTTP status code 400 if file $testName",
		async ({ headers, readFile }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				headers,
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				body: readFile ? await fs.readFile(readFile) : undefined,
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
