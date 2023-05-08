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

	it("Converts DOC file to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_doc.doc"
			),
			headers: {
				"content-type": "application/msword",
			},
		});

		const { body } = JSON.parse(response.payload);

		// String found in first heading of the test document
		expect(body).toMatch(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio."
		);
		// String found at end of the test document
		expect(body).toMatch(
			/Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien$/m
		);
		expect(isHtml(body)).toBe(false);
		expect(response.statusCode).toBe(200);
	});

	// TODO: use `it.concurrent.each()` once it is no longer experimental
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid DOC file",
			readFile: true,
		},
	])(
		"Returns HTTP status code 400 if DOC file $testName",
		async ({ readFile }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				headers: {
					"content-type": "application/msword",
				},
				body: readFile
					? await fs.readFile(
							"./test_resources/test_files/invalid_doc.doc"
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
