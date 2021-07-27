/* eslint-disable security/detect-object-injection */
const autoParse = require("auto-parse");
const createError = require("http-errors");
const fp = require("fastify-plugin");
const fs = require("fs");
const fsp = require("fs").promises;
const glob = require("glob");
const path = require("path");
const { Poppler } = require("node-poppler");
const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Poppler to convert Buffer or string of
 * PDF file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding converted document.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to Poppler binary.
 * @param {object=} options.pdfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#Poppler+pdfToText
 * for options.
 * @param {string=} options.pdfToTxtOptions.encoding - Sets the encoding to use for text output.
 * @param {string=} options.tempDirectory - directory for temporarily storing
 * files during conversion. Required for OCR.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("onResponse", (req, res) => {
		if (req.conversionResults.docLocation) {
			// Remove files from temp directory after response sent
			const files = glob.sync(
				`${req.conversionResults.docLocation.directory}/${req.conversionResults.docLocation.id}*`
			);

			files.forEach((file) => {
				fs.unlinkSync(file);
			});
		}

		return res;
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// `pdfToText` Poppler function still attempts to parse empty bodies/input and produces results
			// so catch them here
			if (req.body === undefined || Object.keys(req.body).length === 0) {
				throw new Error();
			}

			// Define any default settings the plugin should have to get up and running
			const config = {
				binPath: undefined,
				pdfToTxtOptions: { outputEncoding: "UTF-8" },
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			Object.assign(config, options);

			const poppler = new Poppler(config.binPath);

			/**
			 * Create copy of query string params and convert query string params to literal
			 * values to allow Poppler module to use them, as some of the params may be used
			 * in other plugins
			 */
			const query = { ...req.query };
			Object.keys(query).forEach((value) => {
				query[value] = autoParse(query[value]);
			});

			// If `ocr` query string param passed then used pdfToCairo and Tesseract OCR engine
			if (query.ocr && query.ocr === true) {
				// Prune params that pdfToCairo cannot accept
				const pdfToCairoAcceptedParams = [
					"cropHeight",
					"cropWidth",
					"cropXAxis",
					"cropYAxis",
					"firstPageToConvert",
					"lastPageToConvert",
				];
				Object.keys(query).forEach((value) => {
					if (!pdfToCairoAcceptedParams.includes(value)) {
						delete query[value];
					}
				});

				// Create temp directory if missing
				try {
					await fsp.access(config.tempDirectory);
				} catch (err) {
					await fsp.mkdir(config.tempDirectory);
				}

				// Build temporary file for Poppler to write to, and following plugins to read from
				const id = v4();
				const tempFile = `${config.tempDirectory}${id}`;
				req.conversionResults.docLocation = {
					directory: config.tempDirectory,
					id,
				};

				await poppler.pdfToCairo(req.body, tempFile, {
					resolutionXYAxis: 300,
					grayscaleFile: true,
					pngFile: true,
					...query,
				});

				const files = glob.sync(`${tempFile}*.png`);

				// Pass each image file generate to Tesseract OCR
				const results = await Promise.all(
					files.map(async (file) => {
						try {
							const {
								data: { text },
							} = await server.tesseract.addJob(
								"recognize",
								file
							);

							return Promise.resolve(text);
						} catch (err) {
							return Promise.reject(err);
						}
					})
				);

				req.conversionResults.body = results.join(" ");
			} else {
				// Prune params that pdfToTxt cannot accept
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
					"listEncodingOptions",
					"maintainLayout",
					"noDiagonalText",
					"noPageBreaks",
					"outputEncoding",
					"ownerPassword",
					"rawLayout",
					"userPassword",
				];
				Object.keys(query).forEach((value) => {
					if (!pdfToTxtAcceptedParams.includes(value)) {
						delete query[value];
					}
				});
				await Object.assign(config.pdfToTxtOptions, query);

				req.conversionResults.body = await poppler.pdfToText(
					req.body,
					undefined,
					config.pdfToTxtOptions
				);
			}

			// Certain querystring options alter output to HTML rather than TXT
			let contentType = "text/plain";
			if (
				query.boundingBoxXhtml ||
				query.boundingBoxXhtmlLayout ||
				query.generateHtmlMetaFile
			) {
				contentType = "text/html";
			}
			res.header(
				"content-type",
				`${contentType}; charset=${config.pdfToTxtOptions.outputEncoding}`
			);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "pdf-to-txt",
	decorators: {
		fastify: ["tesseract"],
	},
	dependencies: ["image-to-txt"],
});
