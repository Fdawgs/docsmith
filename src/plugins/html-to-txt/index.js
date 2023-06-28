const fp = require("fastify-plugin");
const { htmlToText } = require("html-to-text");
const isHtml = require("is-html");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses html-to-text to convert string containing
 * HTML file in `req.body` to TXT.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		/**
		 * `htmlToText` function still attempts to parse empty bodies/input or invalid HTML
		 * and produces results, so catch them here
		 */
		if (
			req.body === undefined ||
			Object.keys(req.body).length === 0 ||
			!isHtml(req.body)
		) {
			throw server.httpErrors.badRequest();
		}

		req.conversionResults.body = htmlToText(req.body, {
			selectors: [
				{ selector: "a", options: { ignoreHref: true } },
				{ selector: "h1", options: { uppercase: false } },
				{ selector: "img", format: "skip" },
				{
					selector: "table",
					format: "dataTable",
					options: { uppercaseHeaderCells: false },
				},
			],
			wordwrap: null,
		});
		res.type("text/plain; charset=utf-8");
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "htmlToTxt",
	dependencies: ["@fastify/sensible"],
});
