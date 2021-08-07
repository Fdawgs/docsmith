const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
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

		server.register(plugin);

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
		expect(typeof response.body).toEqual("string");
		expect(isHtml(response.body)).toEqual(false);
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

		expect(response.statusCode).toEqual(400);
		expect(response.statusMessage).toEqual("Bad Request");
		expect(body.statusCode).toEqual(400);
		expect(body.error).toEqual("Bad Request");
	});
});
