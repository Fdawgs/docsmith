"use strict";

const fp = require("fastify-plugin");
const { htmlToText } = require("html-to-text");
const isHtml = require("is-html");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function that uses html-to-text
 * to convert HTML to TXT.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	const htmlToTextConfig = {
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
	};

	/**
	 * @author Frazer Smith
	 * @description Converts HTML to TXT.
	 * @param {string} html - Valid HTML.
	 * @returns {string} HTML converted to TXT.
	 */
	function htmlToTxt(html) {
		/**
		 * `htmlToText` function still attempts to parse empty bodies/input or invalid HTML
		 * and produces results, so catch them here
		 */
		if (html === undefined || !isHtml(html)) {
			throw server.httpErrors.badRequest();
		}

		return htmlToText(html, htmlToTextConfig).trim();
	}

	server.decorate("htmlToTxt", htmlToTxt);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "html-to-txt",
	dependencies: ["@fastify/sensible"],
});
