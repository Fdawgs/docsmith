"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("HTML-to-TXT conversion plugin", () => {
	/** @type {Fastify.FastifyInstance} */
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
			res.type("text/plain; charset=utf-8").send(
				server.htmlToTxt(req.body)
			);
		});

		await server.ready();
	});

	afterAll(async () => server.close());

	it("Converts HTML file to TXT", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/html_valid.html"),
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.statusCode).toBe(200);
	});

	/** @todo Use `it.concurrent.each()` once it is no longer experimental. */
	it.each([
		{ testName: "is missing" },
		{ testName: "is empty", body: Buffer.alloc(0) },
		{
			testName: "is not a valid HTML file",
			body: Buffer.from("test"),
		},
	])("Returns HTTP status code 400 if body $testName", async ({ body }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body,
			headers: {
				"content-type": "text/html",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Bad Request",
			message: "Bad Request",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});
});
