const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
const { minify } = require("html-minifier-terser");
const { tidy } = require("htmltidy2");
const util = require("util");
const tags = require("language-tags");

const tidyP = util.promisify(tidy);

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function that uses HTMLTidy2
 * and HTMLMinifier to parse, tidy, and minify HTML passed.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @param {string} html - Valid HTML.
	 * @param {object} options - Function config values.
	 * @param {string=} options.language - Set `lang` and `xml:lang` attributes of `<html>` tag.
	 * Defaults to `en` if not set.
	 * @param {boolean=} options.removeAlt - Set `alt` attributes in `<img>` tags to empty string if set to `true`.
	 * Useful for sending to clinical systems where img tags are stripped from received documents
	 * (i.e. TPP's SystmOne).
	 * @returns {string|Error} Tidied HTML; throws error if `options.language` is not valid IANA language tag.
	 */
	async function tidyHtml(html, options = {}) {
		const dom = new JSDOM(html);

		// Set document language if valid IANA language tag and subtag
		const language = options?.language || "en";
		if (tags.check(language)) {
			const innerHtml = dom.window.document.querySelector("html");
			innerHtml.setAttribute("lang", language);
			innerHtml.setAttribute("xml:lang", language);
		} else {
			throw server.httpErrors.badRequest(
				"querystring.language not a valid IANA language tag"
			);
		}

		// Remove alt attribute from img tags
		if (options?.removeAlt === true) {
			const images = dom.window.document.querySelectorAll("img");
			images.forEach((element) => {
				element.setAttribute("alt", "");
			});
		}

		const parsedHtml = dom.serialize();

		/**
		 * Refer to https://api.html-tidy.org/tidy/tidylib_api_5.8.0/tidy_quickref.html for tidy options
		 *
		 * The following options have been turned on:
		 * - bare (replace smart quotes and em dashes with ASCII and replace `&nbsp;` with spaces)
		 * - clean (replace legacy HTML tags)
		 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
		 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
		 */
		const tidiedHtml = await tidyP(parsedHtml, {
			bare: true,
			clean: true,
			dropProprietaryAttributes: true,
			escapeCdata: true,
		});

		// Refer to https://github.com/terser/html-minifier-terser#options-quick-reference for options
		const minifiedHtml = await minify(tidiedHtml, {
			collapseWhitespace: true,
			decodeEntities: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
			sortAttributes: true,
			sortClassName: true,
		});

		return minifiedHtml;
	}

	server.decorate("tidyHtml", tidyHtml);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "tidy-html",
	dependencies: ["@fastify/sensible"],
});
