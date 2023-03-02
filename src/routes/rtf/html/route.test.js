const accepts = require("@fastify/accepts");
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const sensible = require("@fastify/sensible");
const generateCombos = require("../../../../test_resources/utils/genCombos");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

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

		server = Fastify({ bodyLimit: 10485760 });
		await server
			.register(accepts)
			.register(sensible)
			.register(sharedSchemas)
			.register(tidyCss)
			.register(tidyHtml)
			.register(route, config)
			.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should return RTF file converted to HTML", async () => {
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/valid_rtf_simple.rtf"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(response.payload).toEqual(
							expect.stringContaining(
								"Ask not what your country can do for you"
							)
						);
						expect(isHtml(response.payload)).toBe(true);
						expect(response.headers).toMatchObject({
							"content-type": "text/html",
						});
						expect(response.statusCode).toBe(200);

						return response.statusCode;
					})
			)
		);
	});

	test("Should return RTF file converted to HTML, with images removed", async () => {
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/valid_rtf_complex.rtf"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(response.payload).toEqual(
							expect.stringContaining(
								"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
							)
						);
						expect(isHtml(response.payload)).toBe(true);
						expect(response.headers).toMatchObject({
							"content-type": "text/html",
						});
						expect(response.statusCode).toBe(200);

						return response.statusCode;
					})
			)
		);
	});

	test("Should return HTTP status code 415 if file is missing", async () => {
		await Promise.all(
			queryStrings.map((query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.payload)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					})
			)
		);
	});

	test("Should return HTTP status code 415 if file with '.rtf' extension is not a valid RTF file", async () => {
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/invalid_rtf.rtf"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/rtf",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.payload)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					})
			)
		);
	});

	test("Should return HTTP status code 415 if file media type is not supported by route", async () => {
		await Promise.all(
			queryStrings.map(async (query) =>
				server
					.inject({
						method: "POST",
						url: "/",
						body: await fs.readFile(
							"./test_resources/test_files/valid_empty_html.html"
						),
						query,
						headers: {
							accept: "application/json, text/html",
							"content-type": "application/html",
						},
					})
					.then((response) => {
						expect(JSON.parse(response.payload)).toEqual({
							error: "Unsupported Media Type",
							message: "Unsupported Media Type: application/html",
							statusCode: 415,
						});
						expect(response.statusCode).toBe(415);

						return response.statusCode;
					})
			)
		);
	});

	test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await fs.readFile(
				"./test_resources/test_files/valid_rtf_simple.rtf"
			),
			headers: {
				accept: "application/javascript",
				"content-type": "application/rtf",
			},
		});

		expect(JSON.parse(response.payload)).toEqual({
			error: "Not Acceptable",
			message: "Not Acceptable",
			statusCode: 406,
		});
		expect(response.statusCode).toBe(406);
	});
});
