"use strict";

const CleanCSS = require("clean-css");
const cssEsc = require("cssesc");
const { CSSStyleRule, parse: cssomParse } = require("cssom");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");

const cssCleaner = new CleanCSS({ compatibility: "ie7" });

// Cache immutable regex as they are expensive to create and garbage collect
const fontRegex = /[^-A-Za-z]+/u;
const styleRegex = /<\/style>/gu;

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `tidyCss` function, which
 * parses, tidies, and minifies CSS in `<style>` elements in HTML passed.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Parses, tidies, and minifies CSS in `<style>` elements in HTML passed.
	 * @param {Buffer|string} html - Valid HTML.
	 * @param {object} options - Function config values.
	 * @param {string} [options.backgroundColor] - Color to set or replace the document's
	 * `background-color` property value of `div` CSS selectors with.
	 * @param {string} [options.fonts] - Font to replace document's original font(s), can be
	 * single font or comma separated list i.e `Arial, Sans Serif`.
	 * @returns {string} HTML with tidied CSS.
	 */
	function tidyCss(html, options = {}) {
		const dom = new JSDOM(html);
		let styles = dom.window.document.querySelectorAll("style");

		const newBackgroundColor = options.backgroundColor?.toString();
		const newFonts = options.fonts?.toString();

		// Create style element inside head if none already exist
		if (styles.length === 0 && (newFonts || newBackgroundColor)) {
			const element = dom.window.document.createElement("style");
			element.innerHTML = "div {}";
			dom.window.document.head.append(element);

			styles = dom.window.document.querySelectorAll("style");
		}

		// Combine style elements into single element
		const combinedStyle = dom.window.document.createElement("style");
		styles.forEach((style) => {
			const element = style;
			combinedStyle.innerHTML += element.innerHTML;
			element.remove();
		});

		const styleObj = cssomParse(combinedStyle.innerHTML);

		styleObj.cssRules.forEach((rule) => {
			if (rule instanceof CSSStyleRule) {
				// Replace default font
				if (
					newFonts &&
					(rule.style["font-family"] || styles.length === 1)
				) {
					rule.style.setProperty("font-family", newFonts);
				}

				/**
				 * Font family names containing any non-alphabetical characters
				 * other than hyphens should be quoted.
				 * @see {@link https://w3.org/TR/css-fonts-4/#family-name-syntax | Syntax of <family-name>}
				 */
				if (rule.style["font-family"]) {
					const fonts = rule.style["font-family"].split(",");
					const parsedFonts = fonts.map((font) => {
						if (fontRegex.test(font.trim())) {
							// Stop escaping of <style> elements and code injection
							return cssEsc(font.replace(styleRegex, "").trim(), {
								quotes: "double",
								wrap: true,
							});
						}
						return font.trim();
					});

					rule.style.setProperty(
						"font-family",
						parsedFonts.join(", ")
					);
				}

				if (rule.selectorText.slice(0, 3) === "div") {
					/**
					 * Stop pages overrunning the next page, leading to overlapping text.
					 * "page-break-inside" is a legacy property, replaced by "break-inside".
					 * "page-break-inside" should be treated by browsers as an alias of "break-inside".
					 */
					rule.style.setProperty("page-break-inside", "avoid");

					// Set or replace background color of divs
					if (newBackgroundColor) {
						rule.style.setProperty(
							"background-color",
							newBackgroundColor
						);
					}
				}
			}
		});

		/**
		 * Minifies output whilst also removing HTML comment tags
		 * wrapping CSS, and redundant semi-colons, generated by Poppler.
		 */
		combinedStyle.innerHTML = cssCleaner.minify(styleObj.toString()).styles;

		// Stop empty <style> element being added
		if (combinedStyle.innerHTML !== "") {
			dom.window.document.head.append(combinedStyle);
		}

		return dom.serialize();
	}

	server.decorate("tidyCss", tidyCss);
}

module.exports = fp(plugin, { fastify: "4.x", name: "tidy-css" });
