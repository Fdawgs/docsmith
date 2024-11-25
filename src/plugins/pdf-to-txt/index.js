/* eslint-disable security/detect-non-literal-fs-filename -- Filenames are not user-provided */

"use strict";

const { randomUUID } = require("node:crypto");
const { mkdir, unlink } = require("node:fs/promises");
const camelCase = require("camelcase");
const { fixLatin1ToUtf8: fixUtf8 } = require("fix-latin1-to-utf8");
const fp = require("fastify-plugin");
const { glob } = require("glob");
const { JSDOM } = require("jsdom");
const { joinSafe, normalizeTrim } = require("upath");
const { Poppler } = require("node-poppler");

// Import utils
const parseString = require("../../utils/parse-string");

const pdfToCairoAcceptedParams = new Set([
	"cropHeight",
	"cropWidth",
	"cropXAxis",
	"cropYAxis",
	"firstPageToConvert",
	"lastPageToConvert",
]);

const pdfToTxtAcceptedParams = new Set([
	"boundingBoxXhtml",
	"boundingBoxXhtmlLayout",
	"cropHeight",
	"cropWidth",
	"cropXAxis",
	"cropYAxis",
	"eolConvention",
	"firstPageToConvert",
	"fixedWidthLayout",
	"generateHtmlMetaFile",
	"lastPageToConvert",
	"maintainLayout",
	"noDiagonalText",
	"noPageBreaks",
	"ownerPassword",
	"rawLayout",
	"userPassword",
]);

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Poppler to convert Buffer containing
 * PDF file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {object} [options.pdfToTxtOptions] - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/main/API.md#Poppler+pdfToText
 * for options.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion. Required for OCR.
 * @param {string} [options.tempFilePrefix] - Prefix for temp file names.
 * Defaults to `docsmith_pdf-to-txt`.
 */
async function plugin(server, options) {
	const directory = normalizeTrim(options.tempDir);
	const poppler = new Poppler();

	// Create temp directory if missing
	await mkdir(directory, { recursive: true });

	server
		.decorateRequest("conversionResults", null)
		.addHook("onRequest", async (req) => {
			req.conversionResults = { body: undefined };
		});

	/**
	 * "onSend" hook used instead of "onResponse" ensures
	 * cancelled request temp data is also removed.
	 */
	server.addHook("onSend", async (req, _res, payload) => {
		if (req.conversionResults?.docLocation) {
			// Remove files from temp directory after response sent
			const files = await glob(
				`${joinSafe(
					req.conversionResults.docLocation.directory,
					req.conversionResults.docLocation.id
				)}*`
			);

			await Promise.all(files.map((file) => unlink(file)));
		}

		return payload;
	});

	server.addHook("preHandler", async (req, res) => {
		/**
		 * `pdfToText` Poppler function still attempts to parse empty bodies/input
		 * and produces results, so catch them here.
		 */
		if (!req.body || Buffer.byteLength(req.body) === 0) {
			throw server.httpErrors.badRequest();
		}

		// Define any default settings the plugin should have to get up and running
		const config = {
			pdfToTxtOptions: { outputEncoding: "UTF-8" },
			tempFilePrefix: "docsmith_pdf-to-txt",
			...options,
		};

		/**
		 * Create copy of query string params and convert query string params to literal
		 * values to allow Poppler module to use them, as some of the params may be used
		 * in other plugins.
		 * @type {Record<string, string | number | boolean>}
		 */
		const query = {};
		Object.keys(req.query).forEach((key) => {
			const camelCaseKey = camelCase(key);
			query[camelCaseKey] = parseString(req.query[key]);
		});

		const id = `${config.tempFilePrefix}_${randomUUID()}`;

		/**
		 * If `ocr` query string param passed then use pdfToCairo and Tesseract OCR engine.
		 * Image-to-txt plugin adds the "tesseract" decorator to server instance,
		 * if this is missing then OCR is not supported.
		 */
		if (query.ocr === true && server.tesseract) {
			// Prune params that pdfToCairo cannot accept
			Object.keys(query).forEach((key) => {
				if (!pdfToCairoAcceptedParams.has(key)) {
					delete query[key];
				}
			});

			// Build temp file pattern for Poppler to use for output
			const tempFile = joinSafe(directory, id);

			/**
			 * Create document location object for use by following plugins/hooks
			 * for clean up and auditing purposes.
			 */
			req.conversionResults.docLocation = {
				directory,
				id,
			};

			try {
				await poppler.pdfToCairo(req.body, tempFile, {
					grayscaleFile: true,
					pngFile: true,
					resolutionXYAxis: 300,
					...query,
				});
			} catch (err) {
				/**
				 * Poppler will throw if the .pdf file provided
				 * by client is malformed, thus client error code.
				 */
				if (err.message.includes("Syntax Error:")) {
					throw server.httpErrors.badRequest();
				}

				throw err;
			}

			const files = await glob(`${tempFile}*.png`);

			// Pass each image file generate to Tesseract OCR
			const results = await Promise.all(
				files
					/**
					 * Sort files alphabetically to ensure order is maintained,
					 * as glob does not guarantee order.
					 */
					.sort((a, b) => a.localeCompare(b))
					.map((file) =>
						server.tesseract
							.addJob("recognize", file)
							.then((result) => result?.data.text)
					)
			);

			req.conversionResults.body = results.join(" ");
			res.type("text/plain; charset=utf-8");
		} else {
			// Prune params that pdfToTxt cannot accept
			Object.keys(query).forEach((key) => {
				if (!pdfToTxtAcceptedParams.has(key)) {
					delete query[key];
				}
			});
			Object.assign(config.pdfToTxtOptions, query);

			try {
				req.conversionResults.body = await poppler.pdfToText(
					req.body,
					undefined,
					config.pdfToTxtOptions
				);
			} catch (err) {
				/**
				 * Poppler will throw if the .pdf file provided
				 * by client is malformed, thus client error code.
				 */
				if (err.message.includes("Syntax Error:")) {
					throw server.httpErrors.badRequest();
				}

				throw err;
			}

			// Certain querystring options alter output to HTML rather than TXT
			let contentType = "text/plain";
			if (
				query.boundingBoxXhtml ||
				query.boundingBoxXhtmlLayout ||
				query.generateHtmlMetaFile
			) {
				contentType = "text/html";
				const dom = new JSDOM(req.conversionResults.body);
				const meta = dom.window.document.createElement("meta");
				meta.content = `text/html; charset=${config.pdfToTxtOptions.outputEncoding.toLowerCase()}`;
				meta.httpEquiv = "content-type";
				dom.window.document.head.prepend(meta);

				// Overwrite content of remaining title element with temp file id
				dom.window.document.title = id;

				/**
				 * `fixUtf8` function replaces most common incorrectly converted
				 * Windows-1252 to UTF-8 results with HTML equivalents.
				 * @see {@link https://i18nqa.com/debug/utf8-debug.html | UTF-8 Encoding Debugging Chart}
				 */
				req.conversionResults.body = fixUtf8(dom.serialize());
			}
			res.type(
				`${contentType}; charset=${config.pdfToTxtOptions.outputEncoding.toLowerCase()}`
			);
		}
	});
}

module.exports = fp(plugin, {
	fastify: "5.x",
	name: "pdf-to-txt",
	dependencies: ["@fastify/sensible"],
});
