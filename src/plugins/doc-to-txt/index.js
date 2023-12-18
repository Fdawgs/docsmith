"use strict";

const fp = require("fastify-plugin");
const WordExtractor = require("word-extractor");

const wordExtractor = new WordExtractor();

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `docToTxt` function,
 * which converts Buffers or Uint8Arrays containing a DOC, DOT, DOCM,
 * or DOCX file to TXT.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Converts DOC, DOT, DOCM, or DOCX file to TXT.
	 * @param {Buffer|Uint8Array} doc - DOC, DOT, DOCM, or DOCX file.
	 * @returns {Promise<string>} A promise that resolves with the document converted to TXT string,
	 * or rejects with an `Error` object.
	 */
	async function docToTxt(doc) {
		try {
			const results = await wordExtractor.extract(doc);
			return `${results
				.getHeaders({
					includeFooters: false,
				})
				.trim()}\n${results.getTextboxes({
				includeHeadersAndFooters: false,
			})}\n${results.getBody().trim()}\n${results
				.getEndnotes()
				.trim()}\n${results.getFootnotes().trim()}\n${results
				.getFooters()
				.trim()}`;
		} catch {
			/**
			 * Word-Extractor will throw if the .doc, .docx, .dot, or .dotx file provided
			 * by client is malformed, thus client error code.
			 */
			throw server.httpErrors.badRequest();
		}
	}

	server.decorate("docToTxt", docToTxt);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "doc-to-txt",
	dependencies: ["@fastify/sensible"],
});
