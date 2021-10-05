const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const sensible = require("fastify-sensible");
const plugin = require(".");

describe("DOCX-to-TXT Conversion Plugin", () => {
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.addContentTypeParser(
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			async (req, payload) => {
				const res = await raw(payload);
				return res;
			}
		);

		server.register(sensible).register(plugin);

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.conversionResults);
		});
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should convert DOCX file to TXT", async () => {
		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/valid_docx.docx"
			),
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("Ask not what your country can do for you")
		);
		expect(typeof response.body).toBe("string");
		expect(isHtml(response.body)).toBe(true);
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

		const body = JSON.parse(response.payload);

		expect(body.statusCode).toBe(400);
		expect(body.error).toBe("Bad Request");
		expect(response.statusCode).toBe(400);
	});
});
