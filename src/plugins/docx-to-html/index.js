"use strict";

const { randomUUID } = require("node:crypto");
const { fixLatin1ToUtf8: fixUtf8 } = require("fix-latin1-to-utf8");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
const { convertToHtml } = require("mammoth");
const WordExtractor = require("word-extractor");

const wordExtractor = new WordExtractor();

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `docxToHtml` function,
 * which converts Buffers containing a DOC, DOT, DOCM, or DOCX file to HTML.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Converts DOC, DOT, DOCM, or DOCX file to HTML.
	 * @param {Buffer} doc - DOC, DOT, DOCM, or DOCX file.
	 * @returns {Promise<string>} A promise that resolves with the document converted to HTML string,
	 * or rejects with an `Error` object.
	 */
	async function docxToHtml(doc) {
		try {
			const results = await wordExtractor.extract(doc);
			const { value } = await convertToHtml({ buffer: doc });

			/**
			 * Mammoth does not wrap the results inside <html> and <body> tags itself, so
			 * do that here.
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * @see {@link https://i18nqa.com/debug/utf8-debug.html | UTF-8 Encoding Debugging Chart}
			 */
			return new JSDOM(
				`<!DOCTYPE html>
			<head>
				<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
				<title>docsmith_docx-to-html_${randomUUID()}</title>
			</head>
			<html>
				<body>
					<div>
						<header>${fixUtf8(
							results.getHeaders({ includeFooters: false })
						).trim()}</header>
						${fixUtf8(value)}
						<footer>${fixUtf8(results.getFooters()).trim()}</footer>
					</div>
				</body>
			</html>`
			).serialize();
		} catch {
			/**
			 * Mammoth will throw if the .docm, .docx, .dotm, or .dotx file provided
			 * by client is malformed, thus client error code.
			 */
			throw server.httpErrors.badRequest();
		}
	}

	server.decorate("docxToHtml", docxToHtml);
}

module.exports = fp(plugin, {
	fastify: "5.x",
	name: "docx-to-html",
	dependencies: ["@fastify/sensible"],
});
