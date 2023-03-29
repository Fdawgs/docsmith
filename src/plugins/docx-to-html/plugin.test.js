const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { JSDOM } = require("jsdom");
const sensible = require("@fastify/sensible");
const plugin = require(".");

describe("DOCX-to-HTML conversion plugin", () => {
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

	test("Should convert DOCX file to HTML", async () => {
		const response = await server.inject({
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

		const { body } = JSON.parse(response.payload);
		const dom = new JSDOM(body);

		expect(isHtml(body)).toBe(true);
		// String found in first heading of the test document
		expect(dom.window.document.querySelector("h1").textContent).toBe(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio. "
		);
		// String found in second to last paragraph of the test document
		expect(
			dom.window.document.querySelectorAll("p")[
				dom.window.document.querySelectorAll("p").length - 2
			].textContent
		).toMatch(
			/Nullam venenatis commodo imperdiet. Morbi velit neque, semper quis lorem quis, efficitur dignissim ipsum. Ut ac lorem sed turpis imperdiet eleifend sit amet id sapien$/m
		);
		// Expect all images to be embedded
		dom.window.document.querySelectorAll("img").forEach((image) => {
			expect(image.src).toMatch(/^data:image\/(jp[e]?g|png);base64/im);
		});
	});

	test.each([
		{ testName: "is missing" },
		{
			testName: "is not a valid DOCX file",
			readFile: true,
		},
	])(
		"Should return HTTP status code 400 if DOCX file $testName",
		async ({ readFile }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				headers: {
					"content-type":
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				},
				body: readFile
					? await fs.readFile(
							"./test_resources/test_files/invalid_docx.docx"
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
