"use strict";

const fp = require("fastify-plugin");
const { htmlToText } = require("html-to-text");
const isHtml = require("is-html");

const HTML_TO_TEXT_OPTS = {
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
	wordwrap: false,
};

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `htmlToTxt` function,
 * which converts HTML to TXT.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Converts HTML to TXT.
	 * @param {string} html - Valid HTML.
	 * @returns {string} HTML converted to TXT.
	 */
	function htmlToTxt(html) {
		/**
		 * `htmlToText` function still attempts to parse empty bodies/input or invalid HTML
		 * and produces results, so catch them here.
		 */
		if (html === undefined || !isHtml(html)) {
			throw server.httpErrors.badRequest();
		}

		return htmlToText(html, HTML_TO_TEXT_OPTS).trim();
	}

	server.decorate("htmlToTxt", htmlToTxt);
}

module.exports = fp(plugin, {
	fastify: "5.x",
	name: "html-to-txt",
	dependencies: ["@fastify/sensible"],
});
