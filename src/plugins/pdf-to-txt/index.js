/* eslint-disable security/detect-non-literal-fs-filename */
const fixUtf8 = require("fix-utf8");
const fp = require("fastify-plugin");
const fs = require("fs/promises");
const { glob } = require("glob");
const { JSDOM } = require("jsdom");
const path = require("upath");
const { Poppler } = require("node-poppler");
const { randomUUID } = require("crypto");

// Import utils
const parseString = require("../../utils/parse-string");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Poppler to convert Buffer containing
 * PDF file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to Poppler binary.
 * @param {object=} options.pdfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/main/API.md#Poppler+pdfToText
 * for options.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion. Required for OCR.
 * @param {string} [options.tempFilePrefix="docsmith_pdf-to-txt"] - Prefix for temp file names.
 */
async function plugin(server, options) {
	const directory = path.normalizeTrim(options.tempDir);
	const poppler = new Poppler(options.binPath);

	// Create temp directory if missing
	try {
		await fs.mkdir(directory);
	} catch (err) {
		// Ignore "EEXIST: An object by the name pathname already exists" error
		/* istanbul ignore if */
		if (err.code !== "EEXIST") {
			throw err;
		}
	}

	const pdfToCairoAcceptedParams = [
		"cropHeight",
		"cropWidth",
		"cropXAxis",
		"cropYAxis",
		"firstPageToConvert",
		"lastPageToConvert",
	];

	const pdfToTxtAcceptedParams = [
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
	];

	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	/**
	 * "onSend" hook used instead of "onResponse" ensures
	 * cancelled request temp data is also removed
	 */
	server.addHook("onSend", async (req, _res, payload) => {
		if (req.conversionResults?.docLocation) {
			// Remove files from temp directory after response sent
			const files = await glob(
				`${path.joinSafe(
					req.conversionResults.docLocation.directory,
					req.conversionResults.docLocation.id
				)}*`
			);

			await Promise.all(files.map((file) => fs.unlink(file)));
		}

		return payload;
	});

	server.addHook("preHandler", async (req, res) => {
		/**
		 * `pdfToText` Poppler function still attempts to parse empty bodies/input
		 * and produces results, so catch them here
		 */
		if (req.body === undefined || Object.keys(req.body).length === 0) {
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
		 * in other plugins
		 */
		const query = { ...req.query };
		Object.keys(query).forEach((value) => {
			query[value] = parseString(query[value]);
		});

		const id = `${config.tempFilePrefix}_${randomUUID()}`;

		/**
		 * If `ocr` query string param passed then use pdfToCairo and Tesseract OCR engine.
		 * image-to-txt plugin adds the "tesseract" decorator to server instance,
		 * if this is missing then OCR is not supported
		 */
		if (query.ocr === true && server.tesseract) {
			// Prune params that pdfToCairo cannot accept
			Object.keys(query).forEach((value) => {
				if (!pdfToCairoAcceptedParams.includes(value)) {
					delete query[value];
				}
			});

			// Build temp file pattern for Poppler to use for output
			const tempFile = path.joinSafe(directory, id);

			/**
			 * Create document location object for use by following plugins/hooks
			 * for clean up and auditing purposes
			 */
			req.conversionResults.docLocation = {
				directory,
				id,
			};

			try {
				await poppler.pdfToCairo(req.body, tempFile, {
					resolutionXYAxis: 300,
					grayscaleFile: true,
					pngFile: true,
					...query,
				});
			} catch (err) {
				/**
				 * Poppler will throw if the .pdf file provided
				 * by client is malformed, thus client error code
				 */
				/* istanbul ignore else */
				if (err.message.includes("Syntax Error:")) {
					throw server.httpErrors.badRequest();
				}
				/* istanbul ignore next: unable to test unknown errors */
				throw err;
			}

			// glob sorts files alphabetically
			const files = await glob(`${tempFile}*.png`);

			// Pass each image file generate to Tesseract OCR
			const results = await Promise.all(
				files.map((file) =>
					server.tesseract
						.addJob("recognize", file)
						.then((result) => result?.data.text)
				)
			);

			req.conversionResults.body = results.join(" ");
			res.type("text/plain; charset=utf-8");
		} else {
			// Prune params that pdfToTxt cannot accept
			Object.keys(query).forEach((value) => {
				if (!pdfToTxtAcceptedParams.includes(value)) {
					delete query[value];
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
				 * by client is malformed, thus client error code
				 */
				/* istanbul ignore else */
				if (err.message.includes("Syntax Error:")) {
					throw server.httpErrors.badRequest();
				}
				/* istanbul ignore next: unable to test unknown errors */
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
				 * Refer to https://i18nqa.com/debug/utf8-debug.html for more info
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
	fastify: "4.x",
	name: "pdf-to-txt",
	dependencies: ["@fastify/sensible"],
});
