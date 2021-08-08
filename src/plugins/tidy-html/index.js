const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
const { tidy } = require("htmltidy2");
const util = require("util");

const tidyP = util.promisify(tidy);

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function that uses HTMLTidy2 to
 * parse and tidy HTML passed.
 * @param {Function} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @param {string} html - Valid HTML.
	 * @param {object=} options - Function config values.
	 * @param {string=} options.language - Set `lang` and `xml:lang` attributes of html tag.
	 * Defaults to `en` if not set.
	 * @returns {string} Tidied HTML.
	 */
	async function tidyHtml(html, options) {
		const dom = new JSDOM(html);

		// Set document language
		const innerHtml = dom.window.document.querySelector("html");
		innerHtml.setAttribute("lang", options?.language || "en");
		innerHtml.setAttribute("xml:lang", options?.language || "en");
		const parsedHtml = dom.serialize();

		/**
		 * Refer to http://api.html-tidy.org/tidy/tidylib_api_5.6.0/tidy_quickref.html for tidy options
		 *
		 * The following options have been turned on:
		 * - bare (remove Microsoft specific HTML and replace `&nbsp;` with spaces)
		 * - clean (replace legacy HTML tags)
		 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
		 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
		 * - sortAttributes (sort attributes in element in ascending alphabetic sort)
		 */
		const config = {
			bare: true,
			clean: true,
			dropProprietaryAttributes: true,
			escapeCdata: true,
			sortAttributes: "alpha",
		};

		const results = await tidyP(parsedHtml, config);
		return results;
	}

	server.decorate("tidyHtml", tidyHtml);
}

module.exports = fp(plugin, { fastify: "3.x", name: "tidy-html" });
