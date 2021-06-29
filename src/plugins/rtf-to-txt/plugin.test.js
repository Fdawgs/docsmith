/* eslint-disable security/detect-non-literal-fs-filename */
const { cloneDeep } = require("lodash");
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

describe("RTF-to-TXT Conversion Plugin", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();
		config = cloneDeep(config);
		config.unrtf.tempDirectory = "./src/temp4/";
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser("application/rtf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.rtfToTxtResults);
		});
	});

	afterAll(() => {
		fs.rmdir(config.unrtf.tempDirectory, { recursive: true }, () => {});
	});

	afterEach(async () => {
		await server.close();
	});

	test("Should convert RTF file to HTML and place in specified directory", async () => {
		server.register(plugin, config);

		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync("./test_resources/test_files/valid_rtf.rtf"),
			headers: {
				"content-type": "application/rtf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("Ask not what your country can do for you")
		);
		expect(isHtml(response.body)).toEqual(false);
		expect(typeof response.docLocation).toEqual("object");
		expect(fs.existsSync(response.docLocation.rtf)).toEqual(false);
		expect(fs.existsSync(config.unrtf.tempDirectory)).toEqual(true);
	});

	test("Should return HTTP 400 error if RTF file is missing", async () => {
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/rtf",
			},
		});

		const body = JSON.parse(response.payload);

		expect(response.statusCode).toEqual(400);
		expect(response.statusMessage).toEqual("Bad Request");
		expect(body.statusCode).toEqual(400);
		expect(body.error).toEqual("Bad Request");
	});
});
