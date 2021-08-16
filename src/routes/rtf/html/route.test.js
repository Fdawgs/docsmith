const accepts = require("fastify-accepts");
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const generateCombos = require("../../../../test_resources/utils/genCombos");
const plugin = require(".");
const getConfig = require("../../../config");

const embedHtmlImages = require("../../../plugins/embed-html-images");
const tidyCss = require("../../../plugins/tidy-css");
const tidyHtml = require("../../../plugins/tidy-html");

// Generates 12 different combinations
const queryStrings = generateCombos([
	{ backgroundColor: "white" },
	{ fonts: "Arial" },
	{ fonts: "Arial, Sans Serif" },
	{ language: "fr" },
]);

describe("RTF-to-HTML route", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify()
			.register(accepts)
			.register(embedHtmlImages, config.unrtf)
			.register(tidyCss)
			.register(tidyHtml);
		server.register(plugin, config);

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should return RTF file converted to HTML", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/valid_rtf.rtf"
					),
					query,
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/rtf",
					},
				});
				expect(response.payload).toEqual(
					expect.stringContaining(
						"Ask not what your country can do for you"
					)
				);
				expect(isHtml(response.payload)).toEqual(true);
				expect(response.statusCode).toEqual(200);

				return response.statusCode;
			})
		);
	});

	test("Should return HTTP status code 415 if file is missing", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				const response = await server.inject({
					method: "POST",
					url: "/",
					query,
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/rtf",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});

	test("Should return HTTP status code 415 if file with '.rtf' extension is not a valid RTF file", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/invalid_rtf.rtf"
					),
					query,
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/rtf",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});

	test("Should return HTTP status code 415 if file media type is not supported by route", async () => {
		await Promise.all(
			queryStrings.map(async (query) => {
				const response = await server.inject({
					method: "POST",
					url: "/",
					body: fs.readFileSync(
						"./test_resources/test_files/valid_empty_html.html"
					),
					query,
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/html",
					},
				});

				expect(response.statusCode).toEqual(415);
				expect(response.statusMessage).toEqual(
					"Unsupported Media Type"
				);

				return response.statusCode;
			})
		);
	});

	test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync("./test_resources/test_files/valid_rtf.rtf"),
			headers: {
				accept: "application/javascript",
				"content-type": "application/rtf",
			},
		});

		expect(response.statusCode).toEqual(406);
	});
});
