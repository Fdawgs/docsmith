"use strict";

const { readFile } = require("node:fs/promises");
const fp = require("fastify-plugin");
const { JSDOM } = require("jsdom");
const { joinSafe, normalizeTrim, parse } = require("upath");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `embedHtmlImages` function,
 * which embeds images into HTML, after encoding with Base64.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion. Location of the images to embed.
 */
async function plugin(server, options) {
	const directory = normalizeTrim(options.tempDir);

	/**
	 * @author Frazer Smith
	 * @description Embeds images into HTML, after encoding with Base64.
	 * @param {Buffer|string} html - Valid HTML.
	 * @returns {Promise<string>} A promise that resolves with a tidied HTML string with images embedded, or rejects with an `Error` object
	 * if the images to embed cannot be found.
	 */
	async function embedHtmlImages(html) {
		const dom = new JSDOM(html);
		const images = dom.window.document.querySelectorAll("img");

		await Promise.all(
			Array.from(images, (image) => {
				// Base is used to negate directory traversal attacks
				const { base, ext } = parse(image.src);
				const imgForm = ext.slice(1);

				// eslint-disable-next-line security/detect-non-literal-fs-filename -- imgSrc is not user-provided
				return readFile(joinSafe(directory, base), "base64").then(
					(imageAsBase64) =>
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
