/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-globals */
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
 * PDF file in `req.body` to TXT and places PDF file in a temporary directory.
 * `req` object is decorated with `pdfToTxtResults` object detailing document
 * location, contents etc.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Fastify config values.
 * @param {string} options.poppler.binPath - Obfuscation values.
 * @param {string} options.poppler.encoding - Sets the encoding to use for text output.
 * @param {object=} options.poppler.pdfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#Poppler+pdfToText
 * for options.
 * @param {string} options.poppler.tempDirectory - directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.pdfToTxtResults = { body: undefined, docLocation: {} };
	});

	server.addHook("onResponse", (req) => {
		// Remove files from temp directory after response sent
		const files = glob.sync(
			`${req.pdfToTxtResults.docLocation.directory}/${req.pdfToTxtResults.docLocation.id}*`
		);
		files.forEach((file) => {
			fs.unlinkSync(file);
		});
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// `pdfToText` Poppler function still attempts to parse empty bodies/input and produces results
			// so catch them here
			if (req.body === undefined || Object.keys(req.body).length === 0) {
				throw new Error();
			}

			// Define any default settings the middleware should have to get up and running
			const defaultConfig = {
				binPath: undefined,
				encoding: "UTF-8",
				pdfToTxtOptions: {},
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			this.config = Object.assign(defaultConfig, options.poppler);

			/**
			 * Create copy of query string params and prune that,
			 * as some of the params may be used in other plugins
			 */
			const query = { ...req.query };
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
				} else {
					/**
					 * Convert query string params to literal values to
					 * allow Poppler module to use them
					 */
					query[value] = autoParse(query[value]);
				}
			});
			Object.assign(this.config.pdfToTxtOptions, query);

			// Create temp directory if missing
			try {
				await fsp.access(this.config.tempDirectory);
			} catch (err) {
				await fsp.mkdir(this.config.tempDirectory);
			}

			// Build temporary files for Poppler and following plugins to read from
			const id = v4();
			const tempPdfFile = `${this.config.tempDirectory}${id}.pdf`;
			await fsp.writeFile(tempPdfFile, req.body);
			const poppler = new Poppler(this.config.binPath);

			req.pdfToTxtResults.body = await poppler.pdfToText(
				tempPdfFile,
				undefined,
				this.config.pdfToTxtOptions
			);
			req.pdfToTxtResults.docLocation = {
				directory: this.config.tempDirectory,
				id,
				pdf: tempPdfFile,
			};

			// Certain querystring options alter output to HTML rather than TXT
			let contentType = "text/plain";
			if (
				query.boundingBoxXhtml ||
				query.boundingBoxXhtmlLayout ||
				query.generateHtmlMetaFile
			) {
				contentType = "text/html";
				req.pdfToTxtResults.body = await server.tidyHtml(
					req.pdfToTxtResults.body
				);
			}
			res.header(
				"content-type",
				`${contentType}; charset=${
					this.config.pdfToTxtOptions.outputEncoding ||
					this.config.encoding
				}`
			);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin);
