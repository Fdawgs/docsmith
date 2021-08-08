/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
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
 * @description Pre-handler plugin that uses Poppler to convert Buffer containing
 * PDF file in `req.body` to HTML and places HTML file in a temporary directory.
 * `req` object is decorated with `conversionResults` object detailing document
 * location and contents.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to Poppler binary.
 * @param {object} options.pdfToHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#Poppler+pdfToHtml
 * for options.
 * @param {string} options.pdfToHtmlOptions.encoding - Sets the encoding to use for text output.
 * @param {string=} options.tempDirectory - Directory for temporarily storing
 * files during conversion.
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
			// Define any default settings the plugin should have to get up and running
			const config = {
				binPath: undefined,
				pdfToHtmlOptions: {
					complexOutput: true,
					outputEncoding: "UTF-8",
					singlePage: true,
				},
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			Object.assign(config, options);

			const poppler = new Poppler(config.binPath);

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
			await Object.assign(config.pdfToHtmlOptions, query);

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
				html: tempFile,
				id,
			};

			await poppler.pdfToHtml(
				req.body,
				`${tempFile}.html`,
				config.pdfToHtmlOptions
			);

			// Remove excess title and meta tags left behind by Poppler
			// Poppler appends `-html` to the file name, thus the template literal here
			const dom = new JSDOM(
				await fsp.readFile(`${tempFile}-html.html`, {
					encoding: config.pdfToHtmlOptions.encoding,
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
			req.conversionResults.body = await fixUtf8(dom.serialize());

			res.header(
				"content-type",
				`text/html; charset=${config.pdfToHtmlOptions.outputEncoding.toLowerCase()}`
			);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin, { fastify: "3.x", name: "pdf-to-html" });
