const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const startServer = require("./server");
const getConfig = require("./config");

describe("End-To-End", () => {
	let config;
	let server;

	beforeAll(async () => {
		const AUTH_BEARER_TOKEN_ARRAY = "";
		Object.assign(process.env, {
			AUTH_BEARER_TOKEN_ARRAY,
		});
		config = await getConfig();

		server = Fastify();
		server.register(startServer, config);

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("/pdf/html Route", () => {
		test("Should return PDF file converted to HTML, with expected headers set", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/pdf/html",
				body: fs.readFileSync(
					"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
				),
				query: {
					lastPageToConvert: 2,
				},
				headers: {
					accept: "*/*",
					"content-type": "application/pdf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: ["Origin", "accept-encoding"],
					"x-ratelimit-limit": expect.any(Number),
					"x-ratelimit-remaining": expect.any(Number),
					"x-ratelimit-reset": expect.any(Number),
					"content-type": "text/html; charset=UTF-8",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);
			expect(isHtml(response.payload)).toEqual(true);
			expect(response.statusCode).toEqual(200);
		});
	});

	describe("/pdf/txt Route", () => {
		test("Should return PDF file converted to TXT, with expected headers set", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/pdf/txt",
				body: fs.readFileSync(
					"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
				),
				query: {
					lastPageToConvert: 2,
				},
				headers: {
					accept: "*/*",
					"content-type": "application/pdf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: ["Origin", "accept-encoding"],
					"x-ratelimit-limit": expect.any(Number),
					"x-ratelimit-remaining": expect.any(Number),
					"x-ratelimit-reset": expect.any(Number),
					"content-type": "text/plain; charset=UTF-8",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);
			expect(response.payload).toEqual(
				expect.stringContaining("The NHS Constitution")
			);
			expect(isHtml(response.payload)).toEqual(false);
			expect(response.statusCode).toEqual(200);
		});
	});

	describe("/rtf/html Route", () => {
		test("Should return RTF file converted to HTML, with expected headers set", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/rtf/html",
				body: fs.readFileSync(
					"./test_resources/test_files/valid_rtf.rtf"
				),
				headers: {
					accept: "*/*",
					"content-type": "application/rtf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: ["Origin", "accept-encoding"],
					"x-ratelimit-limit": expect.any(Number),
					"x-ratelimit-remaining": expect.any(Number),
					"x-ratelimit-reset": expect.any(Number),
					"content-type": "text/html",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);
			expect(isHtml(response.payload)).toEqual(true);
			expect(response.statusCode).toEqual(200);
		});
	});

	describe("/rtf/txt Route", () => {
		test("Should return RTF file converted to TXT, with expected headers set", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/rtf/txt",
				body: fs.readFileSync(
					"./test_resources/test_files/valid_rtf.rtf"
				),
				headers: {
					accept: "*/*",
					"content-type": "application/rtf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: ["Origin", "accept-encoding"],
					"x-ratelimit-limit": expect.any(Number),
					"x-ratelimit-remaining": expect.any(Number),
					"x-ratelimit-reset": expect.any(Number),
					"content-type": "text/plain",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);
			expect(isHtml(response.payload)).toEqual(false);
			expect(response.statusCode).toEqual(200);
		});
	});
});

describe("Bearer Token Usage", () => {
	let config;
	let server;

	beforeAll(async () => {
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		Object.assign(process.env, {
			AUTH_BEARER_TOKEN_ARRAY,
		});

		config = await getConfig();

		server = Fastify();
		server.register(startServer, config);

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("/pdf/html Route", () => {
		test("Should return PDF file converted to HTML, with expected headers set", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/pdf/html",
				body: fs.readFileSync(
					"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
				),
				query: {
					lastPageToConvert: 2,
				},
				headers: {
					accept: "*/*",
					authorization: "Bearer testtoken",
					"content-type": "application/pdf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: ["Origin", "accept-encoding"],
					"x-ratelimit-limit": expect.any(Number),
					"x-ratelimit-remaining": expect.any(Number),
					"x-ratelimit-reset": expect.any(Number),
					"content-type": "text/html; charset=UTF-8",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);
			expect(isHtml(response.payload)).toEqual(true);
			expect(response.statusCode).toEqual(200);
		});

		test("Should return 401 error code if auth bearer token is missing", async () => {
			const response = await server.inject({
				method: "POST",
				url: "/pdf/html",
				body: fs.readFileSync(
					"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
				),
				query: {
					lastPageToConvert: 2,
				},
				headers: {
					accept: "*/*",
					"content-type": "application/pdf",
				},
			});

			expect(response.headers).toEqual(
				expect.objectContaining({
					"content-security-policy": expect.any(String),
					"x-dns-prefetch-control": "off",
					"expect-ct": "max-age=0",
					"x-frame-options": "SAMEORIGIN",
					"strict-transport-security":
						"max-age=15552000; includeSubDomains",
					"x-download-options": "noopen",
					"x-content-type-options": "nosniff",
					"x-permitted-cross-domain-policies": "none",
					"referrer-policy":
						"no-referrer,strict-origin-when-cross-origin",
					"x-xss-protection": "0",
					"surrogate-control": "no-store",
					"cache-control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					pragma: "no-cache",
					expires: "0",
					"permissions-policy": "interest-cohort=()",
					vary: "accept-encoding",
					"content-type": "application/json; charset=utf-8",
					"content-length": expect.any(String),
					date: expect.any(String),
					connection: "keep-alive",
				})
			);

			expect(JSON.parse(response.payload)).toEqual(
				expect.objectContaining({
					error: "missing authorization header",
				})
			);
			expect(response.statusCode).toEqual(401);
		});
	});
});
