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
	 * @param {string=} options.backgroundColor - Color to replace document's original
	 * `background-color` CSS property for `<div>` elements with.
	 * @param {string=} options.fonts - Font to replace document's original font(s), can be
	 * single font or comma separated list i.e `Arial, Sans Serif`.
	 * @returns {string} HTML with tidied CSS.
	 */
	function tidyCss(html, options = {}) {
		const dom = new JSDOM(html);
		let styles = dom.window.document.querySelectorAll("style");

		let newBackgroundColor;
		if (options.backgroundColor) {
			newBackgroundColor = String(options.backgroundColor);
		}

		let newFonts;
		if (options.fonts) {
			newFonts = String(options.fonts);
		}

		// Create style element inside head if none already exist
		if (styles.length === 0 && (newFonts || newBackgroundColor)) {
			const element = dom.window.document.createElement("style");
			element.innerHTML = "div {}";
			dom.window.document.head.appendChild(element);

			styles = dom.window.document.querySelectorAll("style");
		}

		styles.forEach((style) => {
			const element = style;

			// Remove optional type attribute
			if (element.hasAttribute("type")) {
				element.removeAttribute("type");
			}

			let styleObj = CSSOM.parse(element.innerHTML);

			styleObj.cssRules.forEach((styleRule) => {
				// Replace default font
				if (
					newFonts &&
					(styleRule.style["font-family"] || styles.length === 1)
				) {
					styleRule.style.setProperty("font-family", newFonts);
				}

				/**
				 * Font family names containing any non-alphabetical characters
				 * other than hyphens should be quoted
				 */
				if (styleRule.style["font-family"]) {
					const fonts = styleRule.style["font-family"].split(",");
					const parsedFonts = [];

					fonts.forEach((font) => {
						if (/[^a-zA-Z-]+/.test(font.trim())) {
							parsedFonts.push(
								`"${font.replace(/"/g, "").trim()}"`
							);
						} else {
							parsedFonts.push(font.trim());
						}
					});

					styleRule.style.setProperty(
						"font-family",
						parsedFonts.join(", ")
					);
				}

				/**
				 * Stop pages overrunning the next page, leading to overlapping text.
				 * "page-break-inside" is a legacy property, replaced by "break-inside".
				 * "page-break-inside" should be treated by browsers as an alias of "break-inside"
				 */
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

			/**
			 * Remove HTML comment tags wrapping CSS and redundant semi-colons
			 * generated by Poppler.
			 * `while` loop is needed to prevent incomplete multi-character
			 * sanitization (CWE-20 and CWE-116).
			 */
			styleObj = styleObj.toString().replace(/;}/gm, "}");
			while (styleObj.match(/<!--|-->/gm) !== null) {
				styleObj = styleObj.replace(/<!--|-->/gm, "");
			}

			element.innerHTML = styleObj;
		});

		return dom.serialize();
	}

	server.decorate("tidyCss", tidyCss);
}

module.exports = fp(plugin, { fastify: "3.x", name: "tidy-css" });
