require("dotenv").config();

const envSchema = require("env-schema");
const S = require("fluent-json-schema");
const fs = require("fs/promises");
const path = require("upath");
const pino = require("pino");
const rotatingLogStream = require("file-stream-rotator");
const secJSON = require("secure-json-parse");

const coreCount = require("../utils/core-count");
const { description, license, version } = require("../../package.json");

/**
 * @author Frazer Smith
 * @description Converts string boolean to boolean
 * or comma-delimited string to array.
 * @param {string} param - CORS parameter.
 * @returns {boolean|Array<string>|string} CORS parameter.
 */
function parseCorsParameter(param) {
	if (param?.toLowerCase().trim() === "true") {
		return true;
	}
	if (param?.toLowerCase().trim() === "false") {
		return false;
	}
	if (param?.includes(",")) {
		return param
			.trim()
			.split(",")
			.map((value) => value.trim());
	}
	return param;
}

/**
 * @author Frazer Smith
 * @description Validates environment variables and builds server config.
 * @returns {Promise<object>} A promise that resolves with a server config object, or rejects with an `Error` object
 * if HTTPS is enabled and the required files are not found.
 */
async function getConfig() {
	// Directory for temporarily storing files during conversion
	const tempDir = path.joinSafe(__dirname, "../temp");

	// Validate env variables
	const env = envSchema({
		dotenv: true,
		schema: S.object()
			.additionalProperties(false)
			.prop("NODE_ENV", S.string())

			// Service
			.prop("HOST", S.string())
			.prop("PORT", S.anyOf([S.number(), S.null()]))
			.prop("REQ_BODY_MAX_BYTES", S.anyOf([S.number(), S.null()]))

			// CORS
			.prop("CORS_ORIGIN", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ALLOWED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ALLOW_CREDENTIALS", S.anyOf([S.boolean(), S.null()]))
			.prop("CORS_EXPOSED_HEADERS", S.anyOf([S.string(), S.null()]))
			.prop("CORS_MAX_AGE", S.anyOf([S.number(), S.null()]))

			// HTTPS
			.prop("HTTPS_PFX_PASSPHRASE", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_PFX_FILE_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_CERT_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_KEY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_HTTP2_ENABLED", S.anyOf([S.boolean(), S.null()]))

			// Logger
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
				])
			)
			.prop("LOG_ROTATION_DATE_FORMAT", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_FILENAME", S.anyOf([S.string(), S.null()]))
			.prop(
				"LOG_ROTATION_FREQUENCY",
				S.anyOf([
					// daily, date, [1-12]h, or [1-30]m
					S.string().pattern(
						/^(?:daily|date|(?:[1-9]|1[012])h|(?:[1-9]|[1-2][0-9]|30)m)$/
					),
					S.null(),
				])
			)
			.prop("LOG_ROTATION_MAX_LOGS", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_MAX_SIZE", S.anyOf([S.string(), S.null()]))

			// Process load handling
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_DELAY",
				S.anyOf([S.number(), S.null()])
			)
			.prop(
				"PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION",
				S.anyOf([S.number(), S.null()])
			)
			.prop(
				"PROC_LOAD_MAX_HEAP_USED_BYTES",
				S.anyOf([S.number(), S.null()])
			)
			.prop("PROC_LOAD_MAX_RSS_BYTES", S.anyOf([S.number(), S.null()]))

			// Rate limiting
			.prop(
				"RATE_LIMIT_EXCLUDED_ARRAY",
				S.anyOf([S.string().pattern(/^\[.*\]$/), S.null()])
			)
			.prop(
				"RATE_LIMIT_MAX_CONNECTIONS_PER_MIN",
				S.anyOf([S.number(), S.null()])
			)

			// Bearer token auth
			.prop(
				"AUTH_BEARER_TOKEN_ARRAY",
				S.anyOf([S.string().pattern(/^\[\{.*\}\]$/), S.null()])
			)

			// Binary paths
			.prop("POPPLER_BINARY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("UNRTF_BINARY_PATH", S.anyOf([S.string(), S.null()]))

			// OCR
			.prop("OCR_ENABLED", S.anyOf([S.boolean(), S.null()]))
			.prop("OCR_LANGUAGES", S.anyOf([S.string(), S.null()]))
			.prop("OCR_WORKERS", S.anyOf([S.number(), S.null()])),
	});

	const config = {
		tempDir,
		fastify: {
			port: env.PORT || 3000,
		},
		fastifyInit: {
			// The maximum payload, in bytes, the server is allowed to accept
			bodyLimit: env.REQ_BODY_MAX_BYTES || 10485760,
			/**
			 * See https://fastify.io/docs/latest/Reference/Logging/
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
					/* istanbul ignore next: pino functions not explicitly tested */
					req(req) {
						return pino.stdSerializers.req(req);
					},
					/* istanbul ignore next: pino functions not explicitly tested */
					res(res) {
						/**
						 * Required for the statusCode to be logged:
						 * https://github.com/pinojs/pino-std-serializers/blob/901dae44c2b71497cdb0f76f6b5af62588107e3e/lib/res.js#L37
						 */
						res.headersSent = true;
						return pino.stdSerializers.res(res);
					},
				},
				timestamp: () => pino.stdTimeFunctions.isoTime(),
			},
			ignoreTrailingSlash: true,
		},
		cors: {
			allowedHeaders: env.CORS_ALLOWED_HEADERS || null,
			credentials: env.CORS_ALLOW_CREDENTIALS === true,
			exposedHeaders: env.CORS_EXPOSED_HEADERS || null,
			hideOptionsRoute: true,
			maxAge: env.CORS_MAX_AGE || null,
			origin: parseCorsParameter(env.CORS_ORIGIN) || false,
		},
		processLoad: {
			maxEventLoopDelay: env.PROC_LOAD_MAX_EVENT_LOOP_DELAY || 0,
			maxEventLoopUtilization:
				env.PROC_LOAD_MAX_EVENT_LOOP_UTILIZATION || 0,
			maxHeapUsedBytes: env.PROC_LOAD_MAX_HEAP_USED_BYTES || 0,
			maxRssBytes: env.PROC_LOAD_MAX_RSS_BYTES || 0,
		},
		rateLimit: {
			allowList: env.RATE_LIMIT_EXCLUDED_ARRAY
				? secJSON.parse(env.RATE_LIMIT_EXCLUDED_ARRAY)
				: null,
			continueExceeding: true,
			hook: "onSend",
			max: env.RATE_LIMIT_MAX_CONNECTIONS_PER_MIN || 1000,
			timeWindow: 60000,
		},
		helmet: {
			contentSecurityPolicy: {
				directives: {
					"default-src": ["'self'"],
					"base-uri": ["'self'"],
					"img-src": ["'self'", "data:"],
					"object-src": ["'none'"],
					"child-src": ["'self'"],
					"frame-ancestors": ["'none'"],
					"form-action": ["'self'"],
					"upgrade-insecure-requests": [],
					"block-all-mixed-content": [],
					"script-src": null,
					"script-src-attr": null,
					"style-src": null,
					"font-src": null,
				},
			},
			crossOriginEmbedderPolicy: false,
			crossOriginOpenerPolicy: false,
			crossOriginResourcePolicy: false,
			hsts: {
				maxAge: 31536000,
			},
			// Only supported by Chrome at time of writing
			originAgentCluster: false,
		},
		swagger: {
			openapi: {
				info: {
					title: "Docsmith",
					description,
					contact: {
						name: "Author",
						email: "frazer.dev@outlook.com",
					},
					license: {
						name: license,
						url: "https://raw.githubusercontent.com/Fdawgs/docsmith/main/LICENSE",
					},
					version,
					// Redoc specific extension to support loading image in docs
					"x-logo": {
						url: "/public/images/docsmith-logo-transparent-background-wide-canvas.png",
						backgroundColor: "#005EB8",
						altText: "Docsmith logo",
					},
				},
				// Components object populated by shared schemas at launch
				components: {
					securitySchemes: env.AUTH_BEARER_TOKEN_ARRAY
						? {}
						: undefined,
				},
				tags: [
					{
						name: "DOC",
						description:
							"Endpoints used for the conversion of DOC documents",
					},
					{
						name: "DOCM",
						description:
							"Endpoints used for the conversion of DOCM documents",
					},
					{
						name: "DOCX",
						description:
							"Endpoints used for the conversion of DOCX documents",
					},
					{
						name: "DOT",
						description:
							"Endpoints used for the conversion of DOT documents",
					},
					{
						name: "DOTM",
						description:
							"Endpoints used for the conversion of DOTM documents",
					},
					{
						name: "DOTX",
						description:
							"Endpoints used for the conversion of DOTX documents",
					},
					{
						name: "HTML",
						description:
							"Endpoints used for the conversion of HTML documents",
					},
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
						name: "System administration",
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
			binPath: env.POPPLER_BINARY_PATH
				? path.normalizeSafe(env.POPPLER_BINARY_PATH)
				: env.POPPLER_BINARY_PATH,
			tempDir,
		},
		tesseract: {
			enabled: env.OCR_ENABLED === true,
			languages: env.OCR_LANGUAGES || "eng",
			// Use number of physical CPU cores available if ENV variable not specified
			workers: env.OCR_WORKERS || coreCount(),
		},
		unrtf: {
			binPath: env.UNRTF_BINARY_PATH
				? path.normalizeSafe(env.UNRTF_BINARY_PATH)
				: env.UNRTF_BINARY_PATH,
			tempDir,
		},
	};

	// Ensure API listens on both IPv4 and IPv6 addresses if not explicitly set
	if (env.HOST) {
		config.fastify.host = env.HOST;
	}

	// Enable HTTPS using cert/key or passphrase/pfx combinations
	if (env.HTTPS_SSL_CERT_PATH && env.HTTPS_SSL_KEY_PATH) {
		try {
			config.fastifyInit.https = {
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				cert: await fs.readFile(
					path.normalizeTrim(env.HTTPS_SSL_CERT_PATH)
				),
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				key: await fs.readFile(
					path.normalizeTrim(env.HTTPS_SSL_KEY_PATH)
				),
			};
		} catch (err) {
			throw new Error(
				`No such file or directory ${err.path} for SSL cert/key`
			);
		}
	}

	if (env.HTTPS_PFX_PASSPHRASE && env.HTTPS_PFX_FILE_PATH) {
		try {
			config.fastifyInit.https = {
				passphrase: env.HTTPS_PFX_PASSPHRASE,
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				pfx: await fs.readFile(
					path.normalizeTrim(env.HTTPS_PFX_FILE_PATH)
				),
			};
		} catch (err) {
			throw new Error(
				`No such file or directory ${err.path} for PFX file`
			);
		}
	}

	if (config.fastifyInit.https && env.HTTPS_HTTP2_ENABLED === true) {
		config.fastifyInit.https.allowHTTP1 = true;
		config.fastifyInit.http2 = true;
	}

	// Set Pino transport
	if (env.LOG_ROTATION_FILENAME) {
		const logFile = path.normalizeTrim(env.LOG_ROTATION_FILENAME);

		// Rotation options: https://github.com/rogerc/file-stream-rotator/#options
		config.fastifyInit.logger.stream = rotatingLogStream.getStream({
			audit_file: path.joinSafe(path.dirname(logFile), ".audit.json"),
			date_format: env.LOG_ROTATION_DATE_FORMAT || "YYYY-MM-DD",
			filename: logFile,
			frequency: env.LOG_ROTATION_FREQUENCY || "daily",
			max_logs: env.LOG_ROTATION_MAX_LOGS,
			size: env.LOG_ROTATION_MAX_SIZE,
			verbose: false,
		});
	}

	// Bearer token auth
	if (env.AUTH_BEARER_TOKEN_ARRAY) {
		const keys = new Set();
		secJSON.parse(env.AUTH_BEARER_TOKEN_ARRAY).forEach((element) => {
			keys.add(element.value);
		});
		config.bearerTokenAuthKeys = keys;

		config.swagger.openapi.components.securitySchemes.bearerToken = {
			type: "http",
			description:
				"Expects the request to contain an `Authorization` header with a bearer token.",
			scheme: "bearer",
			bearerFormat: "bearer <token>",
		};
	}

	return config;
}

module.exports = getConfig;
