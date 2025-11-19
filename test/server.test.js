/* eslint-disable security/detect-non-literal-fs-filename -- Test filenames are not user-provided */

"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const Fastify = require("fastify");
const isHtml = require("is-html");
const { firefox } = require("playwright");
const startServer = require("../src/server");
const getConfig = require("../src/config");

const originalEnv = { ...process.env };

const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.stringMatching(/\d+/u),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": expect.stringMatching(/^text\/plain; charset=utf-8$/iu),
	date: expect.any(String),
	expires: "0",
	"permissions-policy": "interest-cohort=()",
	pragma: "no-cache",
	"referrer-policy": "no-referrer",
	"strict-transport-security": "max-age=31536000; includeSubDomains",
	"surrogate-control": "no-store",
	"x-content-type-options": "nosniff",
	"x-dns-prefetch-control": "off",
	"x-download-options": "noopen",
	"x-frame-options": "SAMEORIGIN",
	"x-permitted-cross-domain-policies": "none",
	"x-ratelimit-limit": expect.stringMatching(/\d+/u),
	"x-ratelimit-remaining": expect.stringMatching(/\d+/u),
	"x-ratelimit-reset": expect.stringMatching(/\d+/u),
};

const expResHeadersHtml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringMatching(/^text\/html; charset=utf-8$/iu),
	"x-xss-protection": "0",
};

const expResHeadersHtmlStatic = {
	...expResHeadersHtml,
	"accept-ranges": "bytes",
	"cache-control": "public, max-age=300",
	"content-length": expect.stringMatching(/\d+/u),
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'",
	etag: expect.any(String),
	"last-modified": expect.any(String),
};
delete expResHeadersHtmlStatic.expires;
delete expResHeadersHtmlStatic.pragma;
delete expResHeadersHtmlStatic["surrogate-control"];

const expResHeadersPublicImage = {
	...expResHeaders,
	"accept-ranges": "bytes",
	"cache-control": "public, max-age=31536000, immutable",
	"content-length": expect.stringMatching(/\d+/u),
	"content-type": expect.stringMatching(/^image\//iu),
	etag: expect.any(String),
	"last-modified": expect.any(String),
};
delete expResHeadersPublicImage.expires;
delete expResHeadersPublicImage.pragma;
delete expResHeadersPublicImage["surrogate-control"];

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringMatching(
		/^application\/json; charset=utf-8$/iu
	),
};

const expResHeaders404Errors = {
	...expResHeadersJson,
};
delete expResHeaders404Errors.vary;

const expResHeaders404ErrorsXml = {
	...expResHeaders404Errors,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringMatching(
		/^application\/xml; charset=utf-8$/iu
	),
	"x-xss-protection": "0",
};

const expResHeaders5xxErrors = {
	...expResHeadersJson,
};

describe("Server deployment", () => {
	describe("Bearer token and OCR disabled", () => {
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				OCR_ENABLED: false,
			});
			const config = await getConfig();

			server = Fastify({ bodyLimit: 10485760, pluginTimeout: 0 });
			await server.register(startServer, config).ready();
		});

		afterAll(async () => {
			// Reset the process.env to default after all tests in describe block
			process.env = {};
			Object.assign(process.env, originalEnv);

			await server.close();
		});

		describe("/admin/healthcheck route", () => {
			it("Returns `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.body).toBe("ok");
				expect(response.headers).toStrictEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("Undeclared route", () => {
			it("Returns HTTP status code 404 if route not found", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/json",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Found",
					message: "Route GET:/invalid not found",
					statusCode: 404,
				});

				expect(response.headers).toStrictEqual(expResHeaders404Errors);
				expect(response.statusCode).toBe(404);
			});

			it("Returns an XML response if media type in `Accept` request header is `application/xml`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/xml",
					},
				});

				expect(response.body).toBe(
					'<?xml version="1.0" encoding="UTF-8"?><response><statusCode>404</statusCode><error>Not Found</error><message>Route GET:/invalid not found</message></response>'
				);
				expect(response.headers).toStrictEqual(
					expResHeaders404ErrorsXml
				);
				expect(response.statusCode).toBe(404);
			});
		});

		describe("/doc/txt route", () => {
			it.each([
				{
					testName: "DOC file",
					filePath: "./test/files/doc_valid.doc",
				},
				{
					testName: "DOT file",
					filePath: "./test/files/dot_valid.dot",
				},
			])(
				"Returns $testName converted to TXT, with expected headers set",
				async ({ filePath }) => {
					const response = await server.inject({
						method: "POST",
						url: "/doc/txt",
						body: await readFile(filePath),
						headers: {
							accept: "application/json, text/plain",
							"content-type": "application/msword",
						},
					});

					expect(response.body).toMatchSnapshot();
					expect(response.headers).toStrictEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				}
			);
		});

		describe("/docx/html route", () => {
			it.each([
				{
					testName: "DOCM file",
					filePath: "./test/files/docm_valid.docm",
					headers: {
						"content-type":
							"application/vnd.ms-word.document.macroEnabled.12",
					},
				},
				{
					testName: "DOCX file",
					filePath: "./test/files/docx_valid.docx",
					headers: {
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
				},
				{
					testName: "DOTX file",
					filePath: "./test/files/dotx_valid.dotx",
					headers: {
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
					},
				},
				{
					testName: "DOTM file",
					filePath: "./test/files/dotm_valid.dotm",
					headers: {
						"content-type":
							"application/vnd.ms-word.template.macroEnabled.12",
					},
				},
			])(
				"Returns $testName converted to HTML, with expected headers set",
				async ({ filePath, headers }) => {
					const response = await server.inject({
						method: "POST",
						url: "/docx/html",
						body: await readFile(filePath),
						headers: {
							accept: "application/json, text/html",
							...headers,
						},
					});

					expect(
						response.body.replace(
							/<title>[-\w]+<\/title>/gu,
							"<title>docsmith</title>"
						)
					).toMatchSnapshot();
					expect(response.headers).toStrictEqual(expResHeadersHtml);
					expect(response.statusCode).toBe(200);
				}
			);
		});

		describe("/docx/txt route", () => {
			it.each([
				{
					testName: "DOCM file",
					filePath: "./test/files/docm_valid.docm",
					headers: {
						"content-type":
							"application/vnd.ms-word.document.macroEnabled.12",
					},
				},
				{
					testName: "DOCX file",
					filePath: "./test/files/docx_valid.docx",
					headers: {
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
				},
				{
					testName: "DOTX file",
					filePath: "./test/files/dotx_valid.dotx",
					headers: {
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
					},
				},
				{
					testName: "DOTM file",
					filePath: "./test/files/dotm_valid.dotm",
					headers: {
						"content-type":
							"application/vnd.ms-word.template.macroEnabled.12",
					},
				},
			])(
				"Returns $testName converted to TXT, with expected headers set",
				async ({ filePath, headers }) => {
					const response = await server.inject({
						method: "POST",
						url: "/docx/txt",
						body: await readFile(filePath),
						headers: {
							accept: "application/json, text/plain",
							...headers,
						},
					});

					expect(response.body).toMatchSnapshot();
					expect(response.headers).toStrictEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				}
			);
		});

		describe("/pdf/html route", () => {
			it("Returns PDF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/pdf",
					},
				});

				expect(response.body).toMatch("for England");
				expect(isHtml(response.body)).toBe(true);
				expect(response.headers).toStrictEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/javascript",
						"content-type": "application/pdf",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("/pdf/txt route", () => {
			it("Returns PDF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/json, text/plain",
						"content-type": "application/pdf",
					},
				});

				expect(response.body).toMatch("for England");
				expect(isHtml(response.body)).toBe(false);
				expect(response.headers).toStrictEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/rtf/html route", () => {
			it("Returns RTF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/rtf/html",
					body: await readFile("./test/files/rtf_valid.rtf"),
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/rtf",
					},
				});

				expect(response.body).toMatch(
					"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
				);
				expect(isHtml(response.body)).toBe(true);
				expect(response.headers).toStrictEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/rtf/txt route", () => {
			it("Returns RTF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/rtf/txt",
					body: await readFile("./test/files/rtf_valid.rtf"),
					headers: {
						accept: "application/json, text/plain",
						"content-type": "application/rtf",
					},
				});

				expect(response.body).toMatch(
					"Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui."
				);
				expect(isHtml(response.body)).toBe(false);
				expect(response.headers).toStrictEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});
		});
	});

	describe("Bearer token and OCR enabled", () => {
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY:
					'[{"service": "test", "value": "testtoken"}]',
				OCR_ENABLED: true,
				OCR_WORKERS: 1,
			});
			const config = await getConfig();

			server = Fastify({ pluginTimeout: 0 });
			await server.register(startServer, config).ready();
		});

		afterAll(async () => {
			// Reset the process.env to default after all tests in describe block
			process.env = {};
			Object.assign(process.env, originalEnv);

			await server.close();
		});

		describe("/admin/healthcheck route", () => {
			it("Returns `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.body).toBe("ok");
				expect(response.headers).toStrictEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("Undeclared route", () => {
			it("Returns HTTP status code 404 if route not found", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/json",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Found",
					message: "Route GET:/invalid not found",
					statusCode: 404,
				});

				expect(response.headers).toStrictEqual(expResHeaders404Errors);
				expect(response.statusCode).toBe(404);
			});

			it("Returns an XML response if media type in `Accept` request header is `application/xml`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/xml",
					},
				});

				expect(response.body).toBe(
					'<?xml version="1.0" encoding="UTF-8"?><response><statusCode>404</statusCode><error>Not Found</error><message>Route GET:/invalid not found</message></response>'
				);
				expect(response.headers).toStrictEqual(
					expResHeaders404ErrorsXml
				);
				expect(response.statusCode).toBe(404);
			});
		});

		describe("/pdf/html route", () => {
			it("Returns PDF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/json, text/html",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.body).toMatch("for England");
				expect(isHtml(response.body)).toBe(true);
				expect(response.headers).toStrictEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 401 if invalid bearer token provided in header", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/json, text/html",
						authorization: "Bearer invalid",
						"content-type": "application/pdf",
					},
				});

				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(401);
			});

			it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
					},
					headers: {
						accept: "application/javascript",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("/pdf/txt route", () => {
			it("Returns PDF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
						ocr: "true",
					},
					headers: {
						accept: "application/json, text/plain",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.body).toMatch("NHS");
				expect(isHtml(response.body)).toBe(false);
				expect(response.headers).toStrictEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 401 if invalid bearer token provided in header", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
						ocr: "true",
					},
					headers: {
						accept: "application/json, text/plain",
						authorization: "Bearer invalid",
						"content-type": "application/pdf",
					},
				});

				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(401);
			});

			it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await readFile(
						"./test/files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						last_page_to_convert: "1",
						ocr: "true",
					},
					headers: {
						accept: "application/javascript",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toStrictEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});
	});

	describe("CORS", () => {
		/** @type {Fastify.FastifyInstance} */
		let server;

		const corsTests = [
			{
				testName: "CORS disabled",
				envVariables: {
					CORS_ORIGIN: "",
				},
				request: {
					headers: {
						origin: "",
					},
				},
				expected: {
					response: {
						headers: {
							json: expResHeadersJson,
							text: expResHeaders,
						},
					},
				},
			},
			{
				testName: "CORS enabled",
				envVariables: {
					CORS_ORIGIN: true,
				},
				request: {
					headers: {
						origin: "https://notreal.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
								vary: "Origin",
							},
							text: {
								...expResHeaders,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
								vary: "Origin",
							},
						},
					},
				},
			},
			{
				testName: "CORS enabled and set to string",
				envVariables: {
					CORS_ORIGIN: "https://notreal.nhs.uk",
				},
				request: {
					headers: {
						origin: "https://notreal.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
							},
							text: {
								...expResHeaders,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
							},
						},
					},
				},
			},
			{
				testName: "CORS enabled and set to array of strings",
				envVariables: {
					CORS_ORIGIN:
						"https://notreal.nhs.uk, https://notreal.sft.nhs.uk",
				},
				request: {
					headers: {
						origin: "https://notreal.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
								vary: "Origin",
							},
							text: {
								...expResHeaders,
								"access-control-allow-origin":
									"https://notreal.nhs.uk",
								vary: "Origin",
							},
						},
					},
				},
			},
			{
				testName: "CORS enabled and set to wildcard",
				envVariables: {
					CORS_ORIGIN: "*",
				},
				request: {
					headers: {
						origin: "https://notreal.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin": "*",
							},
							text: {
								...expResHeaders,
								"access-control-allow-origin": "*",
							},
						},
					},
				},
			},
			{
				testName: "CORS enabled and Bearer token enabled",
				envVariables: {
					CORS_ORIGIN: "*",
					AUTH_BEARER_TOKEN_ARRAY:
						'[{"service": "test", "value": "testtoken"}]',
				},
				request: {
					headers: {
						origin: "https://notreal.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin": "*",
							},
							text: {
								...expResHeaders,
								"access-control-allow-origin": "*",
							},
						},
					},
				},
			},
		];
		describe.each(corsTests)(
			"$testName",
			({ envVariables, expected, request }) => {
				beforeAll(async () => {
					Object.assign(process.env, {
						...envVariables,
						CORS_ALLOWED_HEADERS:
							"Accept, Accept-Encoding, Accept-Language, Authorization, Content-Type, Origin, X-Forwarded-For, X-Requested-With",
						CORS_MAX_AGE: 7200,
					});
					const config = await getConfig();

					server = Fastify({ pluginTimeout: 0 });
					await server.register(startServer, config).ready();
				});

				afterAll(async () => {
					// Reset the process.env to default after all tests in describe block
					process.env = {};
					Object.assign(process.env, originalEnv);

					await server.close();
				});

				describe("/pdf/txt route", () => {
					if (!envVariables.AUTH_BEARER_TOKEN_ARRAY) {
						it("Returns `ok`", async () => {
							const response = await server.inject({
								method: "POST",
								url: "/pdf/txt",
								body: await readFile(
									"./test/files/pdf_1.3_NHS_Constitution.pdf"
								),
								query: {
									last_page_to_convert: "1",
								},
								headers: {
									accept: "application/json, text/plain",
									"content-type": "application/pdf",
									origin: request.headers.origin,
								},
							});

							expect(response.body).toMatch("for England");
							expect(isHtml(response.body)).toBe(false);
							expect(response.headers).toStrictEqual(
								expected.response.headers.text
							);
							expect(response.statusCode).toBe(200);
						});
					}

					// Only applicable if CORS enabled
					if (envVariables.CORS_ORIGIN) {
						it("Returns response to CORS preflight request", async () => {
							const expResHeadersCors = {
								...expResHeaders,
								"access-control-allow-headers":
									process.env.CORS_ALLOWED_HEADERS,
								"access-control-allow-methods": "POST",
								"access-control-allow-origin":
									envVariables.CORS_ORIGIN === "*"
										? "*"
										: request.headers.origin,
								"access-control-max-age": String(
									process.env.CORS_MAX_AGE
								),
								vary: "Origin",
							};
							delete expResHeadersCors["content-type"];

							/**
							 * Vary header should not be set if CORS_ORIGIN is a single domain
							 * or wildcard.
							 * @see {@link https://github.com/fastify/fastify-cors/issues/287}
							 */
							if (
								typeof envVariables.CORS_ORIGIN === "string" &&
								!envVariables.CORS_ORIGIN.includes(",")
							) {
								delete expResHeadersCors.vary;
							}

							const response = await server.inject({
								method: "OPTIONS",
								url: "/pdf/txt",
								headers: {
									"access-control-request-method": "POST",
									origin: request.headers.origin,
								},
							});

							expect(response.body).toBe("");
							expect(response.headers).toStrictEqual(
								expResHeadersCors
							);
							expect(response.statusCode).toBe(204);
						});
					}

					it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "POST",
							url: "/pdf/txt",
							headers: {
								accept: "application/javascript",
								origin: request.headers.origin,
							},
						});

						expect(response.json()).toStrictEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toStrictEqual(
							expected.response.headers.json
						);
						expect(response.statusCode).toBe(406);
					});
				});

				describe("Undeclared route", () => {
					it("Returns HTTP status code 404 if route not found", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/invalid",
							headers: {
								accept: "application/json",
								origin: request.headers.origin,
							},
						});

						expect(response.json()).toStrictEqual({
							error: "Not Found",
							message: "Route GET:/invalid not found",
							statusCode: 404,
						});
						expect(response.headers).toStrictEqual(
							envVariables.CORS_ORIGIN
								? expected.response.headers.json
								: expResHeaders404Errors
						);
						expect(response.statusCode).toBe(404);
					});

					it("Returns an XML response if media type in `Accept` request header is `application/xml`", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/invalid",
							headers: {
								accept: "application/xml",
								origin: request.headers.origin,
							},
						});

						expect(response.body).toBe(
							'<?xml version="1.0" encoding="UTF-8"?><response><statusCode>404</statusCode><error>Not Found</error><message>Route GET:/invalid not found</message></response>'
						);
						expect(response.headers).toStrictEqual(
							envVariables.CORS_ORIGIN
								? {
										...expected.response.headers.json,
										...expResHeaders404ErrorsXml,
									}
								: expResHeaders404ErrorsXml
						);
						expect(response.statusCode).toBe(404);
					});
				});
			}
		);
	});

	describe("API documentation", () => {
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY:
					'[{"service": "test", "value": "testtoken"}]',
				HOST: "localhost",
				PORT: "3000",
				HTTPS_PFX_PASSPHRASE: "",
				HTTPS_PFX_FILE_PATH: "",
				HTTPS_SSL_CERT_PATH: "",
				HTTPS_SSL_KEY_PATH: "",
				HTTPS_HTTP2_ENABLED: "",
				OCR_ENABLED: "",
			});
			const config = await getConfig();

			// Turn off logging for test runs
			config.fastifyInit.logger = undefined;
			// @ts-ignore
			server = Fastify({ ...config.fastifyInit, pluginTimeout: 0 });
			await server.register(startServer, config).listen(config.fastify);
		});

		afterAll(async () => {
			// Reset the process.env to default after all tests in describe block
			process.env = {};
			Object.assign(process.env, originalEnv);

			await server.close();
		});

		describe("Content", () => {
			describe("/docs route", () => {
				it("Returns HTML", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/docs",
						headers: {
							accept: "text/html",
						},
					});

					expect(response.body).toMatchSnapshot();
					expect(response.headers).toStrictEqual(
						expResHeadersHtmlStatic
					);
					expect(response.statusCode).toBe(200);
				});
			});

			describe("/public route", () => {
				it("Returns image", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/public/images/icons/favicon.ico",
						headers: {
							accept: "*/*",
						},
					});

					expect(response.headers).toStrictEqual(
						expResHeadersPublicImage
					);
					expect(response.statusCode).toBe(200);
				});
			});
		});

		describe("Frontend", () => {
			it("Renders docs page without error components", async () => {
				const browserType = await firefox.launch();
				const page = await browserType.newPage();

				await page.goto("http://localhost:3000/docs");
				await expect(page.title()).resolves.toBe(
					"Docsmith | Documentation"
				);
				/**
				 * Checks redoc has not rendered an error component.
				 * @see {@link https://github.com/Redocly/redoc/blob/main/src/components/ErrorBoundary.tsx | Redoc ErrorBoundary component}
				 */
				const heading = page.locator("h1 >> nth=0");
				await heading.waitFor();

				await expect(heading.textContent()).resolves.not.toMatch(
					/something\s*went\s*wrong/iu
				);

				await page.close();
				await browserType.close();
			});
		});
	});

	describe("Error handling", () => {
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				OCR_ENABLED: false,
			});
			const config = await getConfig();

			server = Fastify({ pluginTimeout: 0 });
			await server.register(startServer, config);

			server
				.get("/error", async () => {
					throw new Error("test");
				})
				.get("/error/503", async () => {
					const error = new Error("test");
					error.statusCode = 503;
					throw error;
				});

			await server.ready();
		});

		afterAll(async () => {
			// Reset the process.env to default after all tests in describe block
			process.env = {};
			Object.assign(process.env, originalEnv);

			await server.close();
		});

		describe("/error route", () => {
			it("Returns HTTP status code 500", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/error",
					headers: {
						accept: "*/*",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Internal Server Error",
					message: "Internal Server Error",
					statusCode: 500,
				});
				expect(response.headers).toStrictEqual(expResHeaders5xxErrors);
				expect(response.statusCode).toBe(500);
			});

			it("Returns HTTP status code 503 and does not override error message", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/error/503",
					headers: {
						accept: "*/*",
					},
				});

				expect(response.json()).toStrictEqual({
					error: "Service Unavailable",
					message: "test",
					statusCode: 503,
				});
				expect(response.headers).toStrictEqual(expResHeaders5xxErrors);
				expect(response.statusCode).toBe(503);
			});
		});
	});
});
