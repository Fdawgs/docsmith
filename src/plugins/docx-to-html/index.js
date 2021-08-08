const createError = require("http-errors");
const fp = require("fastify-plugin");
const mammoth = require("mammoth");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Mammoth to convert Buffer containing
 * DOCX file in `req.body` to HTML.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {Function} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			const { value } = await mammoth.convertToHtml(req.body);

			// Mammoth does not wrap the results inside <html> and <body> tags itself
			req.conversionResults.body = `<!DOCTYPE html><html><body>${value}</body></html>`;

			res.header("content-type", `text/html`);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "docx-to-html",
});
