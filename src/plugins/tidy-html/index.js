"use strict";

const { promisify } = require("node:util");
const fp = require("fastify-plugin");
const { CSSStyleRule, parse: cssomParse } = require("cssom");
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
 * - escapeCdata (convert <![CDATA[]]> sections to normal text).
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
	 * @param {boolean} [options.removeHidden] - Remove elements with `display: none` or `visibility: hidden` styles if set to `true`.
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
		 * As such, alt attributes in <img> tags are set to an empty string rather than removed here.
		 * @see {@link https://dequeuniversity.com/rules/axe/4.4/image-alt?application=axeAPI | Deque University: Image alt text}
		 */
		if (options.removeAlt === true) {
			const images = dom.window.document.querySelectorAll("img");
			const imageLength = images.length;
			for (let i = 0; i < imageLength; i += 1) {
				images[i].setAttribute("alt", "");
			}
		}

		/** @type {string} */
		let result = await tidyP(dom.serialize(), htmlTidyConfig);

		if (options.removeHidden === true) {
			/**
			 * HTMLTidy2 consolidates inline styles into classes in multiple style tags.
			 * This simplifies hidden element removal by eliminating parsing of inline
			 * styles and classes.
			 */
			const hidden = new JSDOM(result);
			const { document } = hidden.window;
			const styles = document.querySelectorAll("style");

			styles.forEach((style) => {
				const styleElement = style;
				const styleObj = cssomParse(styleElement.innerHTML);
				const cssRulesLength = styleObj.cssRules.length;

				for (let i = 0; i < cssRulesLength; i += 1) {
					const rule = styleObj.cssRules[i];
					if (rule instanceof CSSStyleRule) {
						if (
							rule.style.display === "none" ||
							rule.style.visibility === "hidden"
						) {
							document
								.querySelectorAll(rule.selectorText)
								.forEach((element) => {
									element.parentNode.removeChild(element);
								});
							// Remove rule from style tag
							styleObj.deleteRule(i);
							// Decrement the counter as the length of rules has changed
							i -= 1;
						}
					}
				}

				styleElement.innerHTML = styleObj.toString();
			});
			result = hidden.serialize();
		}

		return minify(result, htmlMinifyConfig);
	}

	server.decorate("tidyHtml", tidyHtml);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "tidy-html",
	dependencies: ["@fastify/sensible"],
});
