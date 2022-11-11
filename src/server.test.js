const { chromium, firefox } = require("playwright");
const fs = require("fs/promises");
const Fastify = require("fastify");
const isHtml = require("is-html");
const startServer = require("./server");
const getConfig = require("./config");

const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.stringMatching(/\d+/),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": expect.stringContaining("text/plain"),
	date: expect.any(String),
	expires: "0",
	"permissions-policy": "interest-cohort=()",
	pragma: "no-cache",
	"referrer-policy": "no-referrer",
	"strict-transport-security": "max-age=31536000; includeSubDomains",
	"surrogate-control": "no-store",
	vary: "Origin, accept-encoding",
	"x-content-type-options": "nosniff",
	"x-dns-prefetch-control": "off",
	"x-download-options": "noopen",
	"x-frame-options": "SAMEORIGIN",
	"x-permitted-cross-domain-policies": "none",
	"x-ratelimit-limit": expect.any(Number),
	"x-ratelimit-remaining": expect.any(Number),
	"x-ratelimit-reset": expect.any(Number),
};

const expResHeadersHtml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringContaining("text/html"),
	"x-xss-protection": "0",
};

const expResHeadersHtmlStatic = {
	...expResHeadersHtml,
	"accept-ranges": "bytes",
	"cache-control": "private, max-age=180",
	"content-length": expect.any(Number), // @fastify/static plugin returns content-length as number
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self' blob:;frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'",
	etag: expect.any(String),
	expires: undefined,
	"last-modified": expect.any(String),
	pragma: undefined,
	"surrogate-control": undefined,
	vary: "accept-encoding",
};

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringContaining("application/json"),
};

const expResHeadersText = {
	...expResHeaders,
	"content-type": expect.stringContaining("text/plain"),
};

const expResHeaders4xxErrors = {
	...expResHeadersJson,
	"keep-alive": undefined,
	vary: "accept-encoding",
};

describe("Server Deployment", () => {
	describe("Bearer Token and OCR Disabled", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				OCR_ENABLED: false,
			});
			config = await getConfig();

			server = Fastify({ pluginTimeout: 30000 });
			await server.register(startServer, config).ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("/admin/healthcheck Route", () => {
			test("Should return `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.payload).toBe("ok");
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("Undeclared Route", () => {
			test("Should return HTTP status code 404 if route not found", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/json",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Found",
					message: "Route GET:/invalid not found",
					statusCode: 404,
				});

				expect(response.headers).toEqual(expResHeaders4xxErrors);
				expect(response.statusCode).toBe(404);
			});
		});

		describe("/docx/html Route", () => {
			test("Should return DOCX file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/docx/html",
					body: await fs.readFile(
						"./test_resources/test_files/valid_docx.docx"
					),
					headers: {
						accept: "application/json, text/html",
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining(
						"Ask not what your country can do for you"
					)
				);
				expect(isHtml(response.payload)).toBe(true);
				expect(response.headers).toEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/docx/txt Route", () => {
			test("Should return DOCX file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/docx/txt",
					body: await fs.readFile(
						"./test_resources/test_files/valid_docx.docx"
					),
					headers: {
						accept: "application/json, text/plain",
						"content-type":
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining(
						"Ask not what your country can do for you"
					)
				);
				expect(isHtml(response.payload)).toBe(false);
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/pdf/html Route", () => {
			test("Should return PDF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/json, text/html",
						"content-type": "application/pdf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining("for England")
				);
				expect(isHtml(response.payload)).toBe(true);
				expect(response.headers).toEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/javascript",
						"content-type": "application/pdf",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("/pdf/txt Route", () => {
			test("Should return PDF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/json, text/plain",
						"content-type": "application/pdf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining("for England")
				);
				expect(isHtml(response.payload)).toBe(false);
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/rtf/html Route", () => {
			test("Should return RTF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/rtf/html",
					body: await fs.readFile(
						"./test_resources/test_files/valid_rtf.rtf"
					),
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
				expect(isHtml(response.payload)).toBe(true);
				expect(response.headers).toEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});
		});

		describe("/rtf/txt Route", () => {
			test("Should return RTF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/rtf/txt",
					body: await fs.readFile(
						"./test_resources/test_files/valid_rtf.rtf"
					),
					headers: {
						accept: "application/json, text/plain",
						"content-type": "application/rtf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining(
						"Ask not what your country can do for you"
					)
				);
				expect(isHtml(response.payload)).toBe(false);
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});
		});
	});

	describe("Bearer Token and OCR Enabled", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY:
					'[{"service": "test", "value": "testtoken"}]',
				OCR_ENABLED: true,
			});
			config = await getConfig();

			server = Fastify({ pluginTimeout: 30000 });
			await server.register(startServer, config).ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("/admin/healthcheck Route", () => {
			test("Should return `ok`", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "text/plain",
					},
				});

				expect(response.payload).toBe("ok");
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/admin/healthcheck",
					headers: {
						accept: "application/javascript",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("Undeclared Route", () => {
			test("Should return HTTP status code 404 if route not found", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/invalid",
					headers: {
						accept: "application/json",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Found",
					message: "Route GET:/invalid not found",
					statusCode: 404,
				});

				expect(response.headers).toEqual(expResHeaders4xxErrors);
				expect(response.statusCode).toBe(404);
			});
		});

		describe("/pdf/html Route", () => {
			test("Should return PDF file converted to HTML, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/json, text/html",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining("for England")
				);
				expect(isHtml(response.payload)).toBe(true);
				expect(response.headers).toEqual(expResHeadersHtml);
				expect(response.statusCode).toBe(200);
			});

			test("Should return HTTP status code 401 if invalid bearer token provided in header", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/json, text/html",
						authorization: "Bearer invalid",
						"content-type": "application/pdf",
					},
				});

				expect(response.headers).toEqual({
					...expResHeadersJson,
					vary: "accept-encoding",
				});
				expect(response.statusCode).toBe(401);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/html",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
					},
					headers: {
						accept: "application/javascript",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});

		describe("/pdf/txt Route", () => {
			test("Should return PDF file converted to TXT, with expected headers set", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
						ocr: true,
					},
					headers: {
						accept: "application/json, text/plain",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(response.payload).toEqual(
					expect.stringContaining("NHS")
				);
				expect(isHtml(response.payload)).toBe(false);
				expect(response.headers).toEqual(expResHeaders);
				expect(response.statusCode).toBe(200);
			});

			test("Should return HTTP status code 401 if invalid bearer token provided in header", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
						ocr: true,
					},
					headers: {
						accept: "application/json, text/plain",
						authorization: "Bearer invalid",
						"content-type": "application/pdf",
					},
				});

				expect(response.headers).toEqual({
					...expResHeadersJson,
					vary: "accept-encoding",
				});
				expect(response.statusCode).toBe(401);
			});

			test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
				const response = await server.inject({
					method: "POST",
					url: "/pdf/txt",
					body: await fs.readFile(
						"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
					),
					query: {
						lastPageToConvert: 1,
						ocr: true,
					},
					headers: {
						accept: "application/javascript",
						authorization: "Bearer testtoken",
						"content-type": "application/pdf",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Not Acceptable",
					message: "Not Acceptable",
					statusCode: 406,
				});
				expect(response.headers).toEqual(expResHeadersJson);
				expect(response.statusCode).toBe(406);
			});
		});
	});

	describe("CORS", () => {
		let config;
		let server;
		let currentEnv;

		beforeAll(() => {
			Object.assign(process.env, {
				CORS_ALLOWED_HEADERS:
					"Accept, Accept-Encoding, Accept-Language, Authorization, Content-Type, Origin, X-Forwarded-For, X-Requested-With",
				CORS_MAX_AGE: 7200,
			});
			currentEnv = { ...process.env };
		});

		afterEach(async () => {
			// Reset the process.env to default after each test
			Object.assign(process.env, currentEnv);

			await server.close();
		});

		const corsTests = [
			{
				testName: "CORS Disabled",
				envVariables: {
					CORS_ORIGIN: "",
				},
				request: {
					headers: {
						origin: null,
					},
				},
				expected: {
					response: {
						headers: {
							json: expResHeadersJson,
							text: expResHeadersText,
						},
					},
				},
			},
			{
				testName: "CORS Enabled",
				envVariables: {
					CORS_ORIGIN: true,
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
						},
					},
				},
			},
			{
				testName: "Cors Enabled and Set to String",
				envVariables: {
					CORS_ORIGIN: "https://notreal.ydh.nhs.uk",
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
						},
					},
				},
			},
			{
				testName: "Cors Enabled and Set to Array of Strings",
				envVariables: {
					CORS_ORIGIN: [
						"https://notreal.ydh.nhs.uk",
						"https://notreal.sft.nhs.uk",
					],
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
					},
				},
				expected: {
					response: {
						headers: {
							json: {
								...expResHeadersJson,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
							text: {
								...expResHeadersText,
								"access-control-allow-origin":
									"https://notreal.ydh.nhs.uk",
							},
						},
					},
				},
			},
			{
				testName: "Cors Enabled and Set to Wildcard",
				envVariables: {
					CORS_ORIGIN: "*",
				},
				request: {
					headers: {
						origin: "https://notreal.ydh.nhs.uk",
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
								...expResHeadersText,
								"access-control-allow-origin": "*",
							},
						},
					},
				},
			},
		];
		corsTests.forEach((testObject) => {
			describe(`${testObject.testName}`, () => {
				beforeAll(async () => {
					Object.assign(process.env, testObject.envVariables);
					config = await getConfig();
				});

				beforeEach(async () => {
					server = Fastify();
					await server.register(startServer, config).ready();
				});

				describe("/admin/healthcheck Route", () => {
					test("Should return `ok`", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "text/plain",
								origin: testObject.request.headers.origin,
							},
						});

						expect(response.payload).toBe("ok");
						expect(response.headers).toEqual(
							testObject.expected.response.headers.text
						);
						expect(response.statusCode).toBe(200);
					});

					// Only applicable if CORS enabled
					if (testObject.envVariables.CORS_ORIGIN) {
						test("Should return response to CORS preflight request", async () => {
							const response = await server.inject({
								method: "OPTIONS",
								url: "/admin/healthcheck",
								headers: {
									"access-control-request-method": "GET",
									origin: testObject.request.headers.origin,
								},
							});

							expect(response.payload).toBe("");
							expect(response.headers).toEqual({
								...expResHeaders,
								"access-control-allow-headers":
									process.env.CORS_ALLOWED_HEADERS,
								"access-control-allow-methods": "GET, HEAD",
								"access-control-allow-origin":
									testObject.envVariables.CORS_ORIGIN === "*"
										? "*"
										: testObject.request.headers.origin,
								"access-control-max-age": String(
									process.env.CORS_MAX_AGE
								),
								"content-type": undefined,
								vary: "Origin",
							});
							expect(response.statusCode).toBe(204);
						});
					}

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "application/javascript",
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(
							testObject.expected.response.headers.json
						);
						expect(response.statusCode).toBe(406);
					});
				});

				describe("Undeclared Route", () => {
					test("Should return HTTP status code 404 if route not found", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/invalid",
							headers: {
								accept: "application/json",
								origin: testObject.request.headers.origin,
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Found",
							message: "Route GET:/invalid not found",
							statusCode: 404,
						});
						expect(response.headers).toEqual(
							expResHeaders4xxErrors
						);
						expect(response.statusCode).toBe(404);
					});
				});
			});
		});
	});

	describe("API Documentation", () => {
		let config;
		let server;

		let browser;
		let page;

		beforeAll(async () => {
			Object.assign(process.env, {
				HOST: "localhost",
				PORT: "8204",
				HTTPS_PFX_PASSPHRASE: "",
				HTTPS_PFX_FILE_PATH: "",
				HTTPS_SSL_CERT_PATH: "",
				HTTPS_SSL_KEY_PATH: "",
				HTTPS_HTTP2_ENABLED: "",
				OCR_ENABLED: "",
			});
			config = await getConfig();

			// Turn off logging for test runs
			config.fastifyInit.logger = undefined;
			server = Fastify({ ...config.fastifyInit, pluginTimeout: 30000 });
			await server.register(startServer, config).listen(config.fastify);
		});

		afterAll(async () => {
			await server.close();
		});

		describe("Content", () => {
			describe("/docs Route", () => {
				test("Should return HTML", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/docs",
						headers: {
							accept: "text/html",
						},
					});

					expect(isHtml(response.payload)).toBe(true);
					expect(response.headers).toEqual(expResHeadersHtmlStatic);
					expect(response.statusCode).toBe(200);
				});
			});
		});

		describe("Frontend", () => {
			afterEach(async () => {
				await page.close();
				await browser.close();
			});

			// Webkit not tested as it is flakey in context of Playwright
			const browsers = [chromium, firefox];
			browsers.forEach((browserType) => {
				test(`Should render docs page without error components - ${browserType.name()}`, async () => {
					browser = await browserType.launch();
					page = await browser.newPage();

					await page.goto("http://localhost:8204/docs");
					expect(await page.title()).toBe("Docsmith | Documentation");
					/**
					 * Checks redoc has not rendered an error component
					 * https://github.com/Redocly/redoc/blob/main/src/components/ErrorBoundary.tsx
					 */
					const heading = page.locator("h1 >> nth=0");
					await heading.waitFor();

					expect(await heading.textContent()).not.toEqual(
						expect.stringMatching(/something\s*went\s*wrong/i)
					);
				});
			});
		});
	});

	describe("Error Handling", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				AUTH_BEARER_TOKEN_ARRAY: "",
				OCR_ENABLED: false,
			});
			config = await getConfig();

			server = Fastify({ pluginTimeout: 30000 });
			await server.register(startServer, config);

			server.get("/error", async () => {
				throw new Error("test");
			});

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("/error Route", () => {
			test("Should return HTTP status code 500", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/error",
					headers: {
						accept: "*/*",
					},
				});

				expect(JSON.parse(response.payload)).toEqual({
					error: "Internal Server Error",
					message: "Internal Server Error",
					statusCode: 500,
				});
				expect(response.headers).toEqual(expResHeaders4xxErrors);
				expect(response.statusCode).toBe(500);
			});
		});
	});
});
