/* eslint-disable security/detect-non-literal-fs-filename */
const fp = require("fastify-plugin");
const fs = require("fs/promises");
const { JSDOM } = require("jsdom");
const path = require("upath");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function to embed images into HTML,
 * after encoding with Base64.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.tempDirectory - Directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	/**
	 * @param {string} html - Valid HTML.
	 * @returns {string} HTML with images embedded.
	 */
	async function embedHtmlImages(html) {
		const dom = new JSDOM(html);
		const images = dom.window.document.querySelectorAll("img");
		const directory = path.normalizeTrim(options.tempDirectory);

		await Promise.all(
			Array.from(images).map(async (element) => {
				const imgForm = path.extname(element.src).substring(1);

				return fs
					.readFile(path.joinSafe(directory, element.src), "base64")
					.then((imageAsBase64) =>
						element.setAttribute(
							"src",
							`data:image/${imgForm};base64,${imageAsBase64}`
						)
					);
			})
		).catch((err) => {
			throw err;
		});

		return dom.serialize();
	}

	server.decorate("embedHtmlImages", embedHtmlImages);
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "embed-html-images",
});
