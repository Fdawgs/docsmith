/* eslint-disable security/detect-non-literal-fs-filename */
const fp = require("fastify-plugin");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const path = require("path");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function to embed images into HTML,
 * after encoding with Base64.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Fastify config values.
 * @param {string} options.poppler.tempDirectory - directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	/**
	 * @param {string} html - Valid HTML.
	 * @param {boolean=} removeAlt - Removes alt attribute from img tags if set to `true`.
	 * Useful for sending to clinical systems where img tags are stripped from received documents
	 * (i.e. TPP's SystmOne).
	 * @returns {string} HTML with images embedded.
	 */
	function embedHtmlImages(html, removeAlt) {
		const dom = new JSDOM(html);
		const images = dom.window.document.querySelectorAll("img");
		let directory = options.poppler.tempDirectory;
		// Add trailing slash if missing
		directory += directory.endsWith("/") ? "" : "/";

		images.forEach((element) => {
			if (fs.existsSync(directory + element.src)) {
				const imgForm = path.extname(element.src).substring(1);
				const imageAsBase64 = `data:image/${imgForm};base64,${fs.readFileSync(
					directory + element.src,
					"base64"
				)}`;
				element.setAttribute("src", imageAsBase64);

				if (removeAlt === true) {
					element.setAttribute("alt", "");
				}
			}
		});

		return dom.window.document.documentElement.outerHTML;
	}

	server.decorate("embedHtmlImages", embedHtmlImages);
}

module.exports = fp(plugin);
