"use strict";

const { readFile } = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("HTML-to-TXT conversion plugin", () => {
	/**
	 * @type {Fastify.FastifyInstance}
	 */
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.addContentTypeParser(
			"text/html",
			{ parseAs: "string" },
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

	it("Converts HTML file to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/html_valid.html"),
			headers: {
				"content-type": "text/html",
			},
		});

		const { body } = JSON.parse(response.body);

		// String found in header of the test document
		expect(body).toMatch("I am a header");
		// String found in first heading of the test document
		expect(body).toMatch(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio."
		);
		// String found at end of the test document
		expect(body).toMatch(
			/Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien$/mu
		);
		// String found in footer of the test document
		expect(body).toMatch("I am a footer");
		expect(isHtml(body)).toBe(false);
		expect(response.statusCode).toBe(200);
	});

	// TODO: use `it.concurrent.each()` once it is no longer experimental
	it.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid HTML file",
			read: true,
		},
	])(
		"Returns HTTP status code 400 if HTML file $testName",
		async ({ read }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				body: read
					? await readFile(
							"./test_resources/test_files/html_invalid.html"
					  )
					: undefined,
				headers: {
					"content-type": "text/html",
				},
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
