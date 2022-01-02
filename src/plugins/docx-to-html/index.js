const fixUtf8 = require("fix-utf8");
const fp = require("fastify-plugin");
const mammoth = require("mammoth");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses Mammoth to convert Buffer containing
 * DOCX file in `req.body` to HTML.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			const { value } = await mammoth.convertToHtml(req.body);

			/**
			 * Mammoth does not wrap the results inside <html> and <body> tags itself.
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
			 */
			req.conversionResults.body = fixUtf8(`<!DOCTYPE html>
			<head> 
				<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
			</head>
			<html>
				<body>
					<div>
						${value}
					</div>
				</body>
			</html>`);

			res.header("content-type", "text/html; charset=utf-8");
		} catch (err) {
			/**
			 * Mammoth will throw if the .docx file provided
			 * by client is malformed, thus client error code
			 */
			throw res.badRequest();
		}
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "docx-to-html",
	dependencies: ["fastify-sensible"],
});
