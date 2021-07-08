/* eslint-disable security/detect-non-literal-fs-filename */
require("dotenv").config();

const envSchema = require("env-schema");
const S = require("fluent-json-schema");
const fsp = require("fs").promises;
const pino = require("pino");
const rotatingLogStream = require("file-stream-rotator");

const { name, description, license, version } = require("../../package.json");

/**
 * @author Frazer Smith
 * @description Convert string boolean to boolean
 * or comma-delimited string to array.
 * @param {string} param - CORS parameter.
 * @returns {boolean|Array|string} CORS parameter.
 */
function parseCorsParameter(param) {
	if (param.trim() === "true") {
		return true;
	}
	if (param.trim() === "false") {
		return false;
	}
	if (param.includes(",")) {
		const paramArray = [];
		param
			.trim()
			.split(",")
			.forEach((value) => {
				paramArray.push(value.trim());
			});

		return paramArray;
	}
	return param;
}

/**
 * @author Frazer Smith
 * @description Validate environment variables and build server config.
 * @returns {object} Server config.
 */
async function getConfig() {
	// Directory for temporarily storing files during conversion
	const tempDirectory = "./src/temp/";

	// Validate env variables
	const env = envSchema({
		dotenv: true,
		schema: S.object()
			.prop("NODE_ENV", S.string())
			.prop("SERVICE_HOST", S.string())
			.prop("SERVICE_PORT", S.number())
			.prop(
				"SERVICE_BODY_MAX_BYTES",
				S.anyOf([S.number(), S.null()]).default(10485760)
			)
			.prop("HTTPS_PFX_PASSPHRASE", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_PFX_FILE_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_CERT_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_KEY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ORIGIN", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ALLOWED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop(
				"CORS_ALLOW_CREDENTIALS",
				S.anyOf([S.string().enum(["true"]), S.null()])
			)
			.prop("CORS_EXPOSED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_DELAY",
				S.anyOf([S.number(), S.null()]).default(0)
			)
			.prop(
				"PROC_LOAD_MAX_HEAP_USED_BYTES",
				S.anyOf([S.number(), S.null()]).default(0)
			)
			.prop(
				"PROC_LOAD_MAX_RSS_BYTES",
				S.anyOf([S.number(), S.null()]).default(0)
			)
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION",
				S.anyOf([S.number(), S.null()]).default(0)
			)
			.prop("RATE_LIMIT_EXCLUDED_ARRAY", S.anyOf([S.string(), S.null()]))
			.prop(
				"RATE_LIMIT_MAX_CONNECTIONS_PER_MIN",
				S.anyOf([S.number(), S.null()]).default(1000)
			)
			.prop(
				"LOG_LEVEL",
				S.anyOf([
					S.string().enum([
						"fatal",
						"error",
						"warn",
						"info",
						"debug",
						"trace",
						"silent",
					]),
					S.null(),
				]).default("info")
			)
			.prop("LOG_ROTATION_DATE_FORMAT", S.string().default("YYYY-MM-DD"))
			.prop("LOG_ROTATION_FILENAME", S.anyOf([S.string(), S.null()]))
			.prop(
				"LOG_ROTATION_FREQUENCY",
				S.string().enum(["custom", "daily", "test"]).default("daily")
			)
			.prop("LOG_ROTATION_MAX_LOGS", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_MAX_SIZE", S.anyOf([S.string(), S.null()]))
			.prop("AUTH_BEARER_TOKEN_ARRAY", S.anyOf([S.string(), S.null()]))
			.prop("OCR_LANGUAGES", S.anyOf([S.string(), S.null()]))
			.prop("POPPLER_BINARY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("UNRTF_BINARY_PATH", S.anyOf([S.string(), S.null()]))
			.required(["NODE_ENV", "SERVICE_HOST", "SERVICE_PORT"]),
	});

	const config = {
		fastify: {
			host: env.SERVICE_HOST,
			port: env.SERVICE_PORT,
		},
		fastifyInit: {
			// The maximum payload, in bytes, the server is allowed to accept
			bodyLimit: env.SERVICE_BODY_MAX_BYTES || 10485760,
			/**
			 * See https://www.fastify.io/docs/v3.8.x/Logging/
			 * and https://getpino.io/#/docs/api for logger options
			 */
			logger: {
				formatters: {
					level(label) {
						return { level: label };
					},
				},
				level: env.LOG_LEVEL || "info",
				/**
				 * Fastify does not log the req or res body anyway but better
				 * to be safe as a future change could break it
				 */
				redact: ["req.body", "req.headers.authorization", "res.body"],
				serializers: {
					req(req) {
						return pino.stdSerializers.req(req);
					},
					res(res) {
						return pino.stdSerializers.res(res);
					},
				},
				timestamp: () => pino.stdTimeFunctions.isoTime(),
			},
			ignoreTrailingSlash: true,
		},
		cors: {
			origin: parseCorsParameter(env.CORS_ORIGIN) || false,
		},
		processLoad: {
			maxEventLoopDelay: env.PROC_LOAD_MAX_EVENT_LOOP_DELAY || 0,
			maxHeapUsedBytes: env.PROC_LOAD_MAX_HEAP_USED_BYTES || 0,
			maxRssBytes: env.PROC_LOAD_MAX_RSS_BYTES || 0,
			maxEventLoopUtilization:
				env.PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION || 0,
		},
		rateLimit: {
			max: env.RATE_LIMIT_MAX_CONNECTIONS_PER_MIN || 1000,
			timeWindow: 60000,
		},
		swagger: {
			routePrefix: "/docs",
			exposeRoute: true,
			staticCSP: true,
			openapi: {
				info: {
					title: name,
					description,
					contact: {
						name: "Developer",
						email: "frazer.dev@outlook.com",
					},
					license: {
						name: license,
						url: "https://raw.githubusercontent.com/Fdawgs/docsmith/master/LICENSE",
					},
					version,
				},
				components: {},
				tags: [
					{
						name: "PDF",
						description:
							"Endpoints used for the conversion of PDF documents",
					},
					{
						name: "RTF",
						description:
							"Endpoints used for the conversion of RTF documents",
					},
					{
						name: "System Administration",
						description: "",
					},
				],
			},
		},
		htmltidy: {
			/**
			 * Refer to http://api.html-tidy.org/tidy/tidylib_api_5.6.0/tidy_quickref.html for tidy options
			 *
			 * The following options have been turned on:
			 * - bare (remove Microsoft specific HTML and replace `&nbsp;` with spaces)
			 * - clean (replace legacy HTML tags)
			 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
			 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
			 * - sortAttributes (sort attributes in element in ascending alphabetic sort)
			 */
			bare: true,
			clean: true,
			dropProprietaryAttributes: true,
			escapeCdata: true,
			sortAttributes: "alpha",
		},
		poppler: {
			binPath: env.POPPLER_BINARY_PATH,
			ocrLanguages: env.OCR_LANGUAGES || "eng",
			tempDirectory,
		},
		unrtf: {
			binPath: env.UNRTF_BINARY_PATH,
			tempDirectory,
		},
	};

	if (env.LOG_ROTATION_FILENAME) {
		// Rotation options: https://github.com/rogerc/file-stream-rotator/#options
		config.fastifyInit.logger.stream = rotatingLogStream.getStream({
			date_format: env.LOG_ROTATION_DATE_FORMAT || "YYYY-MM-DD",
			filename: env.LOG_ROTATION_FILENAME,
			frequency: env.LOG_ROTATION_FREQUENCY || "daily",
			max_logs: env.LOG_ROTATION_MAX_LOG,
			size: env.LOG_ROTATION_MAX_SIZE,
			verbose: false,
		});
	}

	/**
	 * Pretty output to stdout out if not in production.
	 * Replaces using `pino-pretty` in scripts, as it does not play
	 * well with Nodemon
	 */
	if (
		env.NODE_ENV.toLowerCase() !== "production" &&
		(!env.LOG_ROTATION_FILENAME || env.LOG_ROTATION_FILENAME === "")
	) {
		config.fastifyInit.logger.prettyPrint = true;
	}

	if (env.RATE_LIMIT_EXCLUDED_ARRAY) {
		config.rateLimit.allowList = JSON.parse(env.RATE_LIMIT_EXCLUDED_ARRAY);
	}

	if (env.AUTH_BEARER_TOKEN_ARRAY) {
		const keys = new Set();
		JSON.parse(env.AUTH_BEARER_TOKEN_ARRAY).forEach((element) => {
			keys.add(element.value);
		});
		config.bearerTokenAuthKeys = keys;

		config.swagger.openapi.components.securitySchemes = {
			bearerToken: {
				type: "apiKey",
				name: "Authorization",
				in: "header",
				bearerFormat: "bearer token",
			},
		};
	}

	if (String(env.CORS_ALLOW_CREDENTIALS) === "true") {
		config.cors.credentials = true;
	}
	if (env.CORS_ALLOWED_HEADERS) {
		config.cors.allowedHeaders = env.CORS_ALLOWED_HEADERS;
	}
	if (env.CORS_EXPOSED_HEADERS) {
		config.cors.exposedHeaders = env.CORS_EXPOSED_HEADERS;
	}

	// Enable HTTPS using cert/key or passphrase/pfx combinations
	if (env.HTTPS_SSL_CERT_PATH && env.HTTPS_SSL_KEY_PATH) {
		try {
			config.fastifyInit.https = {
				cert: await fsp.readFile(env.HTTPS_SSL_CERT_PATH),
				key: await fsp.readFile(env.HTTPS_SSL_KEY_PATH),
			};
		} catch (err) {
			throw Error(
				`No such file or directory ${err.path} for SSL cert/key, falling back to HTTP`
			);
		}
	}

	if (env.HTTPS_PFX_PASSPHRASE && env.HTTPS_PFX_FILE_PATH) {
		try {
			config.fastifyInit.https = {
				passphrase: env.HTTPS_PFX_PASSPHRASE,
				pfx: await fsp.readFile(env.HTTPS_PFX_FILE_PATH),
			};
		} catch (err) {
			throw Error(
				`No such file or directory ${err.path} for PFX file, falling back to HTTP`
			);
		}
	}

	return config;
}

module.exports = getConfig;
