const fp = require("fastify-plugin");
const { extractRawText } = require("mammoth");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Mammoth to convert Buffer containing
 * DOCX file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			const { value } = await extractRawText(req.body);
			req.conversionResults.body = value;
			res.type("text/plain; charset=utf-8");
		} catch {
			/**
			 * Mammoth will throw if the .docx file provided
			 * by client is malformed, thus client error code
			 */
			throw server.httpErrors.badRequest();
		}
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "docx-to-txt",
	dependencies: ["@fastify/sensible"],
});
