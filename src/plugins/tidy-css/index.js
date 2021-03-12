const CSSOM = require("cssom");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function that parses
 * and tidies CSS passed.
 * @param {Function} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @param {string} html - Valid HTML.
	 * @param {object} options - Function config values.
	 * @param {string=} options.fonts - Font to replace document's original font(s), can be
	 * single font or comma seperated list i.e `Arial, Sans Serif`.
	 * @param {string=} options.backgroundColor - Color to replace document's original
	 * background color.
	 * @returns {string} HTML with tidied CSS.
	 */
	function tidyCss(html, options = {}) {
		const dom = new JSDOM(html);
		const styles = dom.window.document.querySelectorAll("style");

		let newFonts;
		if (options.fonts) {
			newFonts = String(options.fonts);
		}

		let newBackgroundColor;
		if (options.backgroundColor) {
			newBackgroundColor = String(options.backgroundColor);
		}

		styles.forEach((element) => {
			// Remove optional type attribute
			if (element.hasAttribute("type")) {
				element.removeAttribute("type");
			}

			const styleObj = CSSOM.parse(element.innerHTML);

			styleObj.cssRules.forEach((styleRule) => {
				// Replace default font
				if (newFonts && styleRule.style["font-family"]) {
					styleRule.style.setProperty("font-family", newFonts);
				}

				// Stop pages overrunning the next, leading to overlapped text
				if (styleRule.selectorText.substring(0, 3) === "div") {
					styleRule.style.setProperty("page-break-inside", "avoid");

					// Replace default color
					if (newBackgroundColor) {
						styleRule.style.setProperty(
							"background-color",
							newBackgroundColor
						);
					}
				}
			});

			// Remove HTML comment tags wrapping CSS, and redundant semi-colons
			// eslint-disable-next-line no-param-reassign
			element.innerHTML = styleObj
				.toString()
				.replace(/<!--|-->/gm, "")
				.replace(/;}/gm, "}");
		});

		return dom.window.document.documentElement.outerHTML;
	}

	server.decorate("tidyCss", tidyCss);
}

module.exports = fp(plugin);
