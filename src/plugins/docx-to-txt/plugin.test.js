const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("DOCX-to-TXT conversion plugin", () => {
	let server;

	beforeAll(async () => {
		server = Fastify();

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

	test("Should convert DOCX file to TXT", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_docx.docx"
			),
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining(
				"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
			)
		);
		expect(isHtml(response.body)).toBe(false);
	});

	test("Should return HTTP status code 400 if DOCX file is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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
