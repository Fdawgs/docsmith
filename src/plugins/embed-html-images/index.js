/* eslint-disable security/detect-non-literal-fs-filename */

"use strict";

const { readFile } = require("fs/promises");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
const path = require("upath");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds function to embed images into HTML,
 * after encoding with Base64.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	const directory = path.normalizeTrim(options.tempDir);

	/**
	 * @param {string} html - Valid HTML.
	 * @returns {Promise<string>} A promise that resolves with a tidied HTML string with images embedded, or rejects with an `Error` object
	 * if the images to embed cannot be found.
	 */
	async function embedHtmlImages(html) {
		const dom = new JSDOM(html);
		const images = dom.window.document.querySelectorAll("img");

		await Promise.all(
			Array.from(images, (image) => {
				const imgForm = path.extname(image.src).substring(1);

				return readFile(
					path.joinSafe(directory, image.src),
					"base64"
				).then((imageAsBase64) =>
					image.setAttribute(
						"src",
						`data:image/${imgForm};base64,${imageAsBase64}`
					)
				);
			})
		);

		return dom.serialize();
	}

	server.decorate("embedHtmlImages", embedHtmlImages);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "embed-html-images",
});
