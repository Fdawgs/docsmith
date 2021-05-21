/* eslint-disable security/detect-object-injection */
const autoParse = require("auto-parse");
const createError = require("http-errors");
const fp = require("fastify-plugin");
const { Poppler } = require("node-poppler");

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

			const poppler = new Poppler(this.config.binPath);

			req.pdfToTxtResults.body = await poppler.pdfToText(
				req.body,
				undefined,
				this.config.pdfToTxtOptions
			);

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
