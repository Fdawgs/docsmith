"use strict";

const { promisify } = require("node:util");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
// @ts-ignore
const { minify } = require("html-minifier-terser");
const { tidy } = require("htmltidy2");
const { check } = require("language-tags");

const tidyP = promisify(tidy);

/**
 * The following options have been turned on:
 * - bare (remove Microsoft specific HTML and replace `&nbsp;` with spaces)
 * - clean (replace legacy HTML tags)
 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
 * @see {@link https://api.html-tidy.org/tidy/tidylib_api_5.8.0/tidy_quickref.html | HTMLTidy2 options}
 */
const htmlTidyConfig = {
	bare: true,
	clean: true,
	dropProprietaryAttributes: true,
	escapeCdata: true,
};

/** @see {@link https://github.com/terser/html-minifier-terser#options-quick-reference | HTMLMinifier options} */
const htmlMinifyConfig = {
	collapseWhitespace: true,
	decodeEntities: true,
	removeComments: true,
	removeEmptyAttributes: true,
	removeRedundantAttributes: true,
	sortAttributes: true,
	sortClassName: true,
};

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the function the `tidyHtml` function,
 * which parses, tidies, and minifies HTML passed.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Parses, tidies, and minifies HTML passed.
	 * @param {Buffer|string} html - Valid HTML.
	 * @param {object} options - Function config values.
	 * @param {string} [options.language] - Set `lang` and `xml:lang` attributes of `<html>` tag.
	 * Defaults to `en`.
	 * @param {boolean} [options.removeAlt] - Set `alt` attributes in `<img>` tags to empty string if set to `true`.
	 * Useful for sending to clinical systems where img tags are stripped from received documents
	 * (i.e. TPP's SystmOne), and for screen reader users.
	 * @returns {Promise<string>} A promise that resolves with a tidied HTML string, or rejects with an `Error` object
	 * if `querystring.language` not a valid IANA language tag.
	 */
	async function tidyHtml(html, options = {}) {
		const dom = new JSDOM(html);

		// Set document language if valid IANA language tag and subtag
		const language = options.language || "en";
		if (!check(language)) {
			throw server.httpErrors.badRequest(
				"querystring.language not a valid IANA language tag"
			);
		}
		const innerHtml = dom.window.document.documentElement;
		innerHtml?.setAttribute("lang", language);
		innerHtml?.setAttribute("xml:lang", language);

		/**
		 * When an alt attribute is not present in an <img> tag, screen readers may announce the image's file name instead.
		 * This can be a confusing experience if the file name is not representative of the image's contents.
		 * @see {@link https://dequeuniversity.com/rules/axe/4.4/image-alt?application=axeAPI | Deque University: Image alt text}
		 *
		 * As such, alt attributes in <img> tags are set to an empty string rather than removed here
		 */
		if (options.removeAlt === true) {
			dom.window.document.querySelectorAll("img").forEach((element) => {
				element.setAttribute("alt", "");
			});
		}

		const parsedHtml = dom.serialize();
		const tidiedHtml = await tidyP(parsedHtml, htmlTidyConfig);
		return minify(tidiedHtml, htmlMinifyConfig);
	}

	server.decorate("tidyHtml", tidyHtml);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "tidy-html",
	dependencies: ["@fastify/sensible"],
});
