const faker = require("faker/locale/en_GB");
const fs = require("fs");
const glob = require("glob");
const getConfig = require(".");

describe("Configuration", () => {
	const currentEnv = { ...process.env };

	beforeAll(() => {
		jest.resetModules();
	});

	afterAll(() => {
		const files = glob.GlobSync(`./test_resources/test_log*`).found;
		files.forEach((foundFile) => {
			fs.unlinkSync(foundFile);
		});
	});

	afterEach(() => {
		jest.resetModules();
		Object.assign(process.env, currentEnv);
	});

	test("Should return values according to environment variables - SSL enabled and CORS disabled", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const CORS_ORIGIN = false;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const PROC_LOAD_MAX_EVENT_LOOP_DELAY = 1000;
		const PROC_LOAD_MAX_HEAP_USED_BYTES = 100000000;
		const PROC_LOAD_MAX_RSS_BYTES = 100000000;
		const PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION = 0.98;
		const RATE_LIMIT_MAX_CONNECTIONS_PER_MIN = 2000;
		const RATE_LIMIT_EXCLUDED_ARRAY = '["127.0.0.1"]';
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);
		const LOG_ROTATION_FILENAME = "./test_resources/test_log";
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		const POPPLER_BINARY_PATH = "/usr/bin";
		const UNRTF_BINARY_PATH = "/usr/bin";

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			PROC_LOAD_MAX_HEAP_USED_BYTES,
			PROC_LOAD_MAX_RSS_BYTES,
			PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
			RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			RATE_LIMIT_EXCLUDED_ARRAY,
			LOG_LEVEL,
			LOG_ROTATION_FILENAME,
			AUTH_BEARER_TOKEN_ARRAY,
			POPPLER_BINARY_PATH,
			UNRTF_BINARY_PATH,
		});

		const config = await getConfig();

		expect(config.authKeys).toContain("testtoken");

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.logger).toEqual(
			expect.objectContaining({
				formatters: { level: expect.any(Function) },
				level: LOG_LEVEL,
				serializers: {
					req: expect.any(Function),
					res: expect.any(Function),
				},
				timestamp: expect.any(Function),
				stream: expect.any(Object),
			})
		);

		expect(config.fastifyInit.https).toEqual({
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
		});

		expect(config.processLoad).toEqual({
			maxEventLoopDelay: PROC_LOAD_MAX_EVENT_LOOP_DELAY,
			maxHeapUsedBytes: PROC_LOAD_MAX_HEAP_USED_BYTES,
			maxRssBytes: PROC_LOAD_MAX_RSS_BYTES,
			maxEventLoopUtilization: PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION,
		});

		expect(config.rateLimit).toEqual({
			allowList: JSON.parse(RATE_LIMIT_EXCLUDED_ARRAY),
			max: RATE_LIMIT_MAX_CONNECTIONS_PER_MIN,
			timeWindow: 60000,
		});

		expect(config.poppler).toEqual(
			expect.objectContaining({
				encoding: "UTF-8",
				binPath: POPPLER_BINARY_PATH,
				tempDirectory: expect.any(String),
			})
		);

		expect(config.unrtf).toEqual(
			expect.objectContaining({
				binPath: UNRTF_BINARY_PATH,
				tempDirectory: expect.any(String),
			})
		);
	});

	test("Should return values according to environment variables - PFX enabled and CORS enabled", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // I know it's not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			credentials: CORS_ALLOW_CREDENTIALS,
			origin: CORS_ORIGIN,
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to string value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const CORS_ORIGIN = "https://ydh.nhs.uk";
		const CORS_ALLOWED_HEADERS =
			"Accept, Authorization, Content-Type, Origin, X-Requested-With";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "Location";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			allowedHeaders: CORS_ALLOWED_HEADERS,
			exposedHeaders: CORS_EXPOSED_HEADERS,
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to comma-delimited string value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const CORS_ORIGIN =
			"https://test1.ydh.nhs.uk, https://test2.ydh.nhs.uk";
		const CORS_ALLOWED_HEADERS =
			"Accept, Authorization, Content-Type, Origin, X-Requested-With";
		const CORS_ALLOW_CREDENTIALS = "";
		const CORS_EXPOSED_HEADERS = "Location";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			CORS_EXPOSED_HEADERS,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: expect.arrayContaining([
				"https://test1.ydh.nhs.uk",
				"https://test2.ydh.nhs.uk",
			]),
			allowedHeaders: CORS_ALLOWED_HEADERS,
			exposedHeaders: CORS_EXPOSED_HEADERS,
		});
	});

	test("Should throw error if invalid PFX file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const HTTPS_PFX_FILE_PATH = "./test_resources/test_ssl_cert/error.pfx";
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});

	test("Should throw error if invalid SSL cert file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.datatype.number();
		const HTTPS_SSL_CERT_PATH = "./test_resources/test_ssl_cert/error.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/error.key";
		const CORS_ORIGIN = true;
		const CORS_ALLOWED_HEADERS = "";
		const CORS_ALLOW_CREDENTIALS = "";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			CORS_ALLOWED_HEADERS,
			CORS_ALLOW_CREDENTIALS,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});
