const fp = require("fastify-plugin");
const WordExtractor = require("word-extractor");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Word-Extractor to convert Buffer containing
 * a DOC or DOCX file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	const wordExtractor = new WordExtractor();

	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			const results = await wordExtractor.extract(req.body);

			const value = `${results
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

			req.conversionResults.body = value;
			res.type("text/plain; charset=utf-8");
		} catch {
			/**
			 * Word-Extractor will throw if the .doc or .docx file provided
			 * by client is malformed, thus client error code
			 */
			throw server.httpErrors.badRequest();
		}
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "doc-to-txt",
	dependencies: ["@fastify/sensible"],
});
