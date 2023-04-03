const fs = require("fs/promises");
const { glob } = require("glob");
const path = require("upath");
const getConfig = require(".");

describe("Configuration", () => {
	const currentEnv = { ...process.env, NODE_ENV: "development" };
	const tempDir = path.joinSafe(__dirname, "../temp");

	afterAll(async () => {
		const files = await glob("./test_resources/+(test-log*|.audit.json)", {
			dot: true,
		});

		// eslint-disable-next-line security/detect-non-literal-fs-filename
		await Promise.all(files.map((file) => fs.unlink(file)));
	});

	afterEach(() => {
		// Reset the process.env to default after each test
		Object.assign(process.env, currentEnv);
	});

	it("Uses defaults if values missing and return values according to environment variables", async () => {
		const HOST = "";
		const PORT = "";
		const CORS_ORIGIN = "";
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "";
		const CORS_MAX_AGE = "";
		const HTTPS_SSL_CERT_PATH = "";
		const HTTPS_SSL_KEY_PATH = "";
		const HTTPS_HTTP2_ENABLED = "";
		const LOG_LEVEL = "";
		const LOG_ROTATION_DATE_FORMAT = "";
		const LOG_ROTATION_FILENAME = "";
		const LOG_ROTATION_FREQUENCY = "";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = "";
		const PROC_LOAD_MAX_HEAP_USED_BYTES = "";
		const PROC_LOAD_MAX_RSS_BYTES = "";
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = "";
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = "";
		const RATE_LIMIT_EXCLUDED_ARRAY = "";
		const AUTH_BEARER_TOKEN_ARRAY = "";
		const OCR_ENABLED = "";
		const OCR_LANGUAGES = "";
		const OCR_WORKERS = "";
		const POPPLER_BINARY_PATH = "";
		const UNRTF_BINARY_PATH = "";

		Object.assign(process.env, {
			HOST,
			PORT,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			CORS_MAX_AGE,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
			LOG_ROTATION_DATE_FORMAT,
			LOG_ROTATION_FILENAME,
			LOG_ROTATION_FREQUENCY,
			PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			PROC_LOAD_MAX_HEAP_USED_BYTES,
			PROC_LOAD_MAX_RSS_BYTES,
			RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			RATE_LIMIT_EXCLUDED_ARRAY,
			AUTH_BEARER_TOKEN_ARRAY,
			OCR_ENABLED,
			OCR_LANGUAGES,
			OCR_WORKERS,
			POPPLER_BINARY_PATH,
			UNRTF_BINARY_PATH,
		});

		const config = await getConfig();

		expect(config.bearerTokenAuthKeys).toBeUndefined();

		expect(config.tempDir).toBe(tempDir);

		expect(config.fastify).toEqual({
			port: 3000,
		});

		expect(config.fastifyInit.bodyLimit).toBe(10485760);

		expect(config.fastifyInit.logger).toEqual({
			formatters: { level: expect.any(Function) },
			level: "info",
			redact: ["req.body", "req.headers.authorization", "res.body"],
			serializers: {
				req: expect.any(Function),
				res: expect.any(Function),
			},
			timestamp: expect.any(Function),
		});
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.timestamp()).toMatch(/^,"time"/);

		expect(config.fastifyInit.https).toBeUndefined();
		expect(config.fastifyInit.http2).toBeUndefined();

		expect(config.cors).toEqual({
			allowedHeaders: null,
			credentials: false,
			exposedHeaders: null,
			hideOptionsRoute: true,
			maxAge: null,
			origin: false,
		});

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: 0,
			maxEventLoopUtilization: 0,
			maxHeapUsedBytes: 0,
			maxRssBytes: 0,
		});

		expect(config.rateLimit).toEqual({
			allowList: null,
			continueExceeding: true,
			hook: "onSend",
			max: 1000,
			timeWindow: 60000,
		});

		expect(config.poppler).toEqual({
			binPath: POPPLER_BINARY_PATH,
			tempDir,
		});

		expect(config.tesseract).toEqual({
			enabled: false,
			languages: "eng",
			workers: expect.any(Number),
		});

		expect(config.unrtf).toEqual({
			binPath: UNRTF_BINARY_PATH,
			tempDir,
		});
	});

	it("Uses defaults logging values if values missing", async () => {
		const LOG_LEVEL = "";
		const LOG_ROTATION_DATE_FORMAT = "";
		const LOG_ROTATION_FILENAME = "./test_resources/test-log-%DATE%.log";
		const LOG_ROTATION_FREQUENCY = "";

		Object.assign(process.env, {
			LOG_LEVEL,
			LOG_ROTATION_DATE_FORMAT,
			LOG_ROTATION_FILENAME,
			LOG_ROTATION_FREQUENCY,
		});

		const config = await getConfig();

		expect(config.fastifyInit.logger).toEqual({
			formatters: { level: expect.any(Function) },
			level: "info",
			redact: ["req.body", "req.headers.authorization", "res.body"],
			serializers: {
				req: expect.any(Function),
				res: expect.any(Function),
			},
			stream: expect.any(Object),
			timestamp: expect.any(Function),
		});
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.stream.config.options).toMatchObject({
			filename: LOG_ROTATION_FILENAME,
			date_format: "YYYY-MM-DD",
			frequency: "daily",
		});
		expect(config.fastifyInit.logger.timestamp()).toMatch(/^,"time"/);
	});

	it("Returns values according to environment variables - HTTPS (SSL cert) enabled, HTTP2 enabled, and OCR enabled", async () => {
		const HOST = "0.0.0.0";
		const PORT = 443;
		const REQ_BODY_MAX_BYTES = 100000000;
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = "trace";
		const LOG_ROTATION_DATE_FORMAT = "YYYY-MM";
		const LOG_ROTATION_FILENAME = "./test_resources/test-log-%DATE%.log";
		const LOG_ROTATION_FREQUENCY = "date";
		const LOG_ROTATION_MAX_LOGS = "10";
		const LOG_ROTATION_MAX_SIZE = "150k";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = 1000;
		const PROC_LOAD_MAX_HEAP_USED_BYTES = 100000000;
		const PROC_LOAD_MAX_RSS_BYTES = 100000000;
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = 0.98;
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = 2000;
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		const OCR_ENABLED = true;
		const OCR_LANGUAGES = "cym";
		const OCR_WORKERS = 1;
		const POPPLER_BINARY_PATH = "/usr/bin";
		const UNRTF_BINARY_PATH = "/usr/bin";

		Object.assign(process.env, {
			HOST,
			PORT,
			REQ_BODY_MAX_BYTES,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
			LOG_ROTATION_DATE_FORMAT,
			LOG_ROTATION_FILENAME,
			LOG_ROTATION_FREQUENCY,
			LOG_ROTATION_MAX_LOGS,
			LOG_ROTATION_MAX_SIZE,
			PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			PROC_LOAD_MAX_HEAP_USED_BYTES,
			PROC_LOAD_MAX_RSS_BYTES,
			RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			RATE_LIMIT_EXCLUDED_ARRAY,
			AUTH_BEARER_TOKEN_ARRAY,
			OCR_ENABLED,
			OCR_LANGUAGES,
			OCR_WORKERS,
			POPPLER_BINARY_PATH,
			UNRTF_BINARY_PATH,
		});

		const config = await getConfig();

		expect(config.bearerTokenAuthKeys).toContain("testtoken");

		expect(config.tempDir).toBe(tempDir);

		expect(config.fastify).toEqual({
			host: HOST,
			port: PORT,
		});

		expect(config.fastifyInit.bodyLimit).toBe(REQ_BODY_MAX_BYTES);

		expect(config.fastifyInit.logger).toEqual({
			formatters: { level: expect.any(Function) },
			level: LOG_LEVEL,
			redact: ["req.body", "req.headers.authorization", "res.body"],
			serializers: {
				req: expect.any(Function),
				res: expect.any(Function),
			},
			stream: expect.any(Object),
			timestamp: expect.any(Function),
		});
		expect(config.fastifyInit.logger.formatters.level()).toEqual({
			level: undefined,
		});
		expect(config.fastifyInit.logger.stream.config.options).toMatchObject({
			date_format: LOG_ROTATION_DATE_FORMAT,
			filename: LOG_ROTATION_FILENAME,
			frequency: LOG_ROTATION_FREQUENCY,
			max_logs: LOG_ROTATION_MAX_LOGS,
			size: LOG_ROTATION_MAX_SIZE,
		});
		expect(config.fastifyInit.logger.timestamp()).toMatch(/^,"time"/);

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toBe(true);

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			maxEventLoopUtilization: PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			maxHeapUsedBytes: PROC_LOAD_MAX_HEAP_USED_BYTES,
			maxRssBytes: PROC_LOAD_MAX_RSS_BYTES,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			continueExceeding: true,
			hook: "onSend",
			max: RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			timeWindow: 60000,
		});

		expect(config.poppler).toEqual({
			binPath: POPPLER_BINARY_PATH,
			tempDir,
		});

		expect(config.tesseract).toEqual({
			enabled: OCR_ENABLED,
			languages: OCR_LANGUAGES,
			workers: OCR_WORKERS,
		});

		expect(config.unrtf).toEqual({
			binPath: UNRTF_BINARY_PATH,
			tempDir,
		});
	});

	it("Returns values according to environment variables - HTTPS (PFX cert) enabled and HTTP2 enabled", async () => {
		const HOST = "0.0.0.0";
		const PORT = 443;
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // Not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = "TestPassphrase";
		const HTTPS_HTTP2_ENABLED = true;
		const LOG_LEVEL = "trace";

		Object.assign(process.env, {
			HOST,
			PORT,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			HTTPS_HTTP2_ENABLED,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: HOST,
			port: PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			allowHTTP1: true,
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});
		expect(config.fastifyInit.http2).toBe(true);
	});

	// CORS env variables
	it.each([
		{
			testName: "CORS origin set to true and credentials enabled",
			envVariables: {
				CORS_ORIGIN: true,
				CORS_ALLOW_CREDENTIALS: true,
			},
			expected: {
				origin: true,
				credentials: true,
			},
		},
		{
			testName: "CORS origin set to false",
			envVariables: {
				CORS_ORIGIN: false,
			},
			expected: {
				origin: false,
			},
		},
		{
			testName: "CORS origin set to comma-delimited string value",
			envVariables: {
				CORS_ORIGIN: "https://test1.nhs.uk, https://test2.nhs.uk",
			},
			expected: {
				origin: expect.arrayContaining([
					"https://test1.nhs.uk",
					"https://test2.nhs.uk",
				]),
			},
		},
		{
			testName: "CORS origin set to string value",
			envVariables: {
				CORS_ORIGIN: "https://nhs.uk",
			},
			expected: {
				origin: "https://nhs.uk",
			},
		},
	])(
		"Returns values according to environment variables - $testName",
		async ({ envVariables, expected }) => {
			const HOST = "0.0.0.0";
			const PORT = 80;
			const { CORS_ORIGIN } = envVariables;
			const CORS_ALLOWED_HEADERS =
				"Accept, Authorization, Content-Type, Origin, X-Requested-With";
			const CORS_ALLOW_CREDENTIALS =
				envVariables.CORS_ALLOW_CREDENTIALS || "";
			const CORS_EXPOSED_HEADERS = "Location";
			const CORS_MAX_AGE = 10;
			const LOG_LEVEL = "trace";

			Object.assign(process.env, {
				HOST,
				PORT,
				CORS_ORIGIN,
				CORS_ALLOWED_HEADERS,
				CORS_ALLOW_CREDENTIALS,
				CORS_EXPOSED_HEADERS,
				CORS_MAX_AGE,
				LOG_LEVEL,
			});

			const config = await getConfig();

			expect(config.fastify).toEqual({
				host: HOST,
				port: PORT,
			});

			expect(config.cors).toEqual({
				origin: expected.origin,
				allowedHeaders: CORS_ALLOWED_HEADERS,
				credentials: expected.credentials || false,
				exposedHeaders: CORS_EXPOSED_HEADERS,
				hideOptionsRoute: true,
				maxAge: CORS_MAX_AGE,
			});
		}
	);

	// HTTPS cert path env variables
	it.each([
		{
			testName: "invalid PFX file path",
			envVariables: {
				HTTPS_PFX_FILE_PATH: "./test_resources/test_ssl_cert/error.pfx",
				HTTPS_PFX_PASSPHRASE: "TestPassphrase",
			},
		},
		{
			testName: "invalid SSL cert file path",
			envVariables: {
				HTTPS_SSL_CERT_PATH:
					"./test_resources/test_ssl_cert/error.cert",
				HTTPS_SSL_KEY_PATH: "./test_resources/test_ssl_cert/error.key",
			},
		},
	])("Throws error if $testName", async ({ envVariables }) => {
		const HOST = "0.0.0.0";
		const PORT = 443;
		const HTTPS_SSL_KEY_PATH = envVariables.HTTPS_SSL_KEY_PATH || "";
		const HTTPS_SSL_CERT_PATH = envVariables.HTTPS_SSL_CERT_PATH || "";
		const HTTPS_PFX_FILE_PATH = envVariables.HTTPS_PFX_FILE_PATH || "";
		const HTTPS_PFX_PASSPHRASE = envVariables.HTTPS_PFX_PASSPHRASE || "";
		const LOG_LEVEL = "trace";

		Object.assign(process.env, {
			HOST,
			PORT,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});
