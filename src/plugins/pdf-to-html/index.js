/* eslint-disable security/detect-non-literal-fs-filename -- Filename is not user-provided */

"use strict";

const { randomUUID } = require("node:crypto");
const { mkdir, readFile, unlink } = require("node:fs/promises");
const { normalize, resolve } = require("node:path");
const camelCase = require("camelcase");
const { fixLatin1ToUtf8: fixUtf8 } = require("fix-latin1-to-utf8");
const fp = require("fastify-plugin");
const { glob } = require("glob");
const { JSDOM } = require("jsdom");
const { Poppler } = require("node-poppler");

// Import utils
const parseString = require("../../utils/parse-string");

const POPPLER_PDF_TO_HTML_ACCEPTED_PARAMS = new Set([
	"exchangePdfLinks",
	"extractHidden",
	"firstPageToConvert",
	"ignoreImages",
	"imageFormat",
	"lastPageToConvert",
	"noDrm",
	"noMergeParagraph",
	"ownerPassword",
	"userPassword",
	"wordBreakThreshold",
	"zoom",
]);

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Poppler to convert Buffer containing
 * PDF file in `req.body` to HTML and places HTML file in a temp directory.
 * `req` object is decorated with `conversionResults` object detailing document
 * location and contents.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {object} [options.pdfToHtmlOptions] - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/main/API.md#Poppler+pdfToHtml
 * for options.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion.
 * @param {string} [options.tempFilePrefix] - Prefix for temp file names.
 * Defaults to `docsmith_pdf-to-html`.
 */
async function plugin(server, options) {
	const directory = normalize(options.tempDir);
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
				`${resolve(
					req.conversionResults.docLocation.directory,
					req.conversionResults.docLocation.id
				)}*`,
				{
					windowsPathsNoEscape: true,
				}
			);

			await Promise.all(files.map((file) => unlink(file)));
		}

		return payload;
	});

	server.addHook("preHandler", async (req, res) => {
		// Define any default settings the plugin should have to get up and running
		const config = {
			pdfToHtmlOptions: {
				complexOutput: true,
				outputEncoding: "UTF-8",
				singlePage: true,
			},
			tempFilePrefix: "docsmith_pdf-to-html",
			...options,
		};

		/**
		 * Create copy of query string params and prune that,
		 * as some of the params may be used in other plugins.
		 * @type {Record<string, string | number | boolean>}
		 */
		const query = {};
		for (const key of Object.keys(req.query)) {
			const camelCaseKey = camelCase(key);

			if (POPPLER_PDF_TO_HTML_ACCEPTED_PARAMS.has(camelCaseKey)) {
				/**
				 * Convert query string params to literal keys to
				 * allow Poppler module to use them.
				 */
				query[camelCaseKey] = parseString(req.query[key]);
			}
		}
		Object.assign(config.pdfToHtmlOptions, query);

		// Build temp file pattern for Poppler to use for output
		const id = `${config.tempFilePrefix}_${randomUUID()}`;
		const tempFile = resolve(directory, id);

		/**
		 * Create document location object for use by following plugins/hooks
		 * for clean up and auditing purposes.
		 */
		req.conversionResults.docLocation = {
			directory,
			// Poppler appends `-html` to the file name
			html: `${tempFile}-html.html`,
			id,
		};

		try {
			await poppler.pdfToHtml(
				req.body,
				`${tempFile}.html`,
				config.pdfToHtmlOptions
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

		/**
		 * Remove excess title and meta elements created by Poppler
		 * as it generates a new title and meta element for each page
		 * of the PDF document.
		 * Poppler appends `-html` to the file name.
		 */
		const dom = new JSDOM(await readFile(`${tempFile}-html.html`));
		const titles = dom.window.document.querySelectorAll("title");
		for (let i = 1; i < titles.length; i += 1) {
			titles[i].remove();
		}
		const metas = dom.window.document.querySelectorAll("meta");
		for (let i = 1; i < metas.length; i += 1) {
			metas[i].remove();
		}

		// Move meta element to beginning of head element
		dom.window.document.head.prepend(metas[0]);

		/**
		 * Overwrite content of remaining title element with temp file id,
		 * as Poppler reveals directory structure in title.
		 */
		titles[0].textContent = id;

		/**
		 * `fixUtf8` function replaces most common incorrectly converted
		 * Windows-1252 to UTF-8 results with HTML equivalents.
		 * @see {@link https://i18nqa.com/debug/utf8-debug.html | UTF-8 Encoding Debugging Chart}
		 */
		req.conversionResults.body = fixUtf8(dom.serialize());
		res.type(
			`text/html; charset=${config.pdfToHtmlOptions.outputEncoding.toLowerCase()}`
		);
	});
}

module.exports = fp(plugin, {
	fastify: "5.x",
	name: "pdf-to-html",
	dependencies: ["@fastify/sensible"],
});
