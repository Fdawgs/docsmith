/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-globals */
const autoParse = require("auto-parse");
const createError = require("http-errors");
const fixUtf8 = require("fix-utf8");
const fp = require("fastify-plugin");
const fs = require("fs");
const fsp = require("fs").promises;
const glob = require("glob");
const { JSDOM } = require("jsdom");
const path = require("path");
const { Poppler } = require("node-poppler");
const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Poppler to convert Buffer or string of
 * PDF file in `req.body` to HTML and places both files in a temporary directory.
 * `req` object is decorated with `pdfToHtmlResults` object detailing document
 * location, contents etc.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Fastify config values.
 * @param {string} options.poppler.binPath - Obfuscation values.
 * @param {string} options.poppler.encoding - Sets the encoding to use for text output.
 * @param {object=} options.poppler.pdfToHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#Poppler+pdfToHtml
 * for options.
 * @param {string} options.poppler.tempDirectory - directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.pdfToHtmlResults = { body: undefined, docLocation: {} };
	});

	server.addHook("onResponse", (req) => {
		// Remove files from temp directory after response sent
		const files = glob.sync(
			`${req.pdfToHtmlResults.docLocation.directory}/${req.pdfToHtmlResults.docLocation.id}*`
		);
		files.forEach((file) => {
			fs.unlinkSync(file);
		});
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// Define any default settings the middleware should have to get up and running
			const defaultConfig = {
				binPath: undefined,
				encoding: "UTF-8",
				pdfToHtmlOptions: {
					complexOutput: true,
					singlePage: true,
				},
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			this.config = Object.assign(defaultConfig, options.poppler);

			/**
			 * Create copy of query string params and prune that,
			 * as some of the params may be used in other plugins
			 */
			const query = { ...req.query };
			const pdfToHtmlAcceptedParams = [
				"exchangePdfLinks",
				"extractHidden",
				"firstPageToConvert",
				"ignoreImages",
				"imageFormat",
				"lastPageToConvert",
				"noDrm",
				"noMergeParagraph",
				"outputEncoding",
				"ownerPassword",
				"userPassword",
				"wordBreakThreshold",
				"zoom",
			];
			Object.keys(query).forEach((value) => {
				if (!pdfToHtmlAcceptedParams.includes(value)) {
					delete query[value];
				} else {
					/**
					 * Convert query string params to literal values to
					 * allow Poppler module to use them
					 */
					query[value] = autoParse(query[value]);
				}
			});
			Object.assign(this.config.pdfToHtmlOptions, query);

			// Create temp directory if missing
			try {
				await fsp.access(this.config.tempDirectory);
			} catch (err) {
				await fsp.mkdir(this.config.tempDirectory);
			}

			// Build temporary files for Poppler and following plugins to read from
			const id = v4();
			const tempPdfFile = `${this.config.tempDirectory}${id}.pdf`;
			const tempHtmlFile = `${this.config.tempDirectory}${id}-html.html`;
			await fsp.writeFile(tempPdfFile, req.body);
			const poppler = new Poppler(this.config.binPath);
			await poppler.pdfToHtml(tempPdfFile, this.config.pdfToHtmlOptions);

			// Remove excess title and meta tags left behind by Poppler
			const dom = new JSDOM(
				await fsp.readFile(tempHtmlFile, {
					encoding: this.config.encoding,
				})
			);
			const titles = dom.window.document.querySelectorAll("title");
			for (let index = 1; index < titles.length; index += 1) {
				titles[index].parentNode.removeChild(titles[index]);
			}
			const metas = dom.window.document.querySelectorAll("meta");
			for (let index = 1; index < metas.length; index += 1) {
				metas[index].parentNode.removeChild(metas[index]);
			}

			/**
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
			 */
			req.pdfToHtmlResults.body = fixUtf8(
				dom.window.document.documentElement.outerHTML
			);
			req.pdfToHtmlResults.docLocation = {
				directory: this.config.tempDirectory,
				html: tempHtmlFile,
				id,
				pdf: tempPdfFile,
			};

			res.header(
				"content-type",
				`text/html; charset=${
					this.config.pdfToHtmlOptions.outputEncoding ||
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
