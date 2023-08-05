/* eslint-disable security/detect-non-literal-fs-filename */

"use strict";

const { randomUUID } = require("crypto");
const { mkdir, rm, unlink, writeFile } = require("fs/promises");
const fixUtf8 = require("fix-utf8");
const fp = require("fastify-plugin");
const { glob } = require("glob");
const { JSDOM } = require("jsdom");
const path = require("upath");
const { UnRTF } = require("node-unrtf");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses UnRTF to convert Buffer containing
 * RTF file in `req.body` to HTML and places RTF file in a temp directory.
 * `req` object is decorated with `conversionResults` object detailing document
 * location and contents.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to UnRTF binary.
 * @param {object=} options.rtfToHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-unrtf/blob/main/API.md
 * for options.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion.
 * @param {string} [options.tempFilePrefix] - Prefix for temp file names.
 * Defaults to `docsmith_rtf-to-html`.
 */
async function plugin(server, options) {
	const directory = path.normalizeTrim(options.tempDir);
	const unrtf = new UnRTF(options.binPath);

	// Create temp directory if missing
	await mkdir(directory, { recursive: true });

	server
		.decorateRequest("conversionResults", null)
		.addHook("onRequest", async (req) => {
			req.conversionResults = { body: undefined };
		});

	/**
	 * "onSend" hook used instead of "onResponse" ensures
	 * cancelled request temp data is also removed
	 */
	server.addHook("onSend", async (req, _res, payload) => {
		if (req.conversionResults?.docLocation) {
			// Remove files from temp directory after response sent
			const files = await glob(
				`${path.joinSafe(
					req.conversionResults.docLocation.directory,
					req.conversionResults.docLocation.id
				)}*`
			);

			await Promise.all(files.map((file) => unlink(file)));
		}

		return payload;
	});

	server.addHook("preHandler", async (req, res) => {
		// Define any default settings the plugin should have to get up and running
		const config = {
			rtfToHtmlOptions: {
				/**
				 * Images are removed because UnRTF generates image names as `pict001.wmf`,
				 * `pict002.wmf`, and so on. This poses a confidentiality and clinical risk as,
				 * should two concurrent requests have the same image name, the second request
				 * would overwrite the first request's image and that image would be embedded
				 * into both HTML documents.
				 *
				 * We wouldn't want to add one patient's image to another patient's document
				 */
				noPictures: true,
				outputHtml: true,
			},
			tempFilePrefix: "docsmith_rtf-to-html",
			...options,
		};

		/**
		 * UnRTF removes hyperlinks and replaces them with the text of the hyperlink,
		 * however older versions of UnRTF remove the hyperlink text entirely.
		 * Remove RTF hyperlinks prior to conversion to ensure consistent results
		 */
		req.body = req.body
			.toString()
			.replace(
				/\{\\field\{\\\*\\fldinst HYPERLINK ".*?" \}\{\\fldrslt (.*?)\}/gsu,
				"$1"
			);

		// Build temp RTF file for UnRTF to read from
		const id = `${config.tempFilePrefix}_${randomUUID()}`;
		const tempFile = path.joinSafe(directory, `${id}.rtf`);
		// 0600 permissions (read/write for owner only)
		await writeFile(tempFile, req.body, {
			encoding: "utf8",
			mode: 0o600,
		});

		/**
		 * Create document location object for use by following plugins/hooks
		 * for clean up and auditing purposes
		 */
		req.conversionResults.docLocation = {
			directory,
			rtf: tempFile,
			id,
		};

		try {
			// Add meta and title elements to HTML document
			const dom = new JSDOM(
				await unrtf.convert(tempFile, config.rtfToHtmlOptions)
			);
			const meta = dom.window.document.createElement("meta");
			meta.content = "text/html; charset=utf-8";
			meta.httpEquiv = "content-type";
			const title = dom.window.document.createElement("title");
			title.innerHTML = id;
			dom.window.document.head.prepend(meta, title);

			/**
			 * UnRTF < v0.20.4 ignores `noPictures` option and
			 * generates img tags whilst placing images in cwd.
			 *
			 * UnRTF generates the image name as `pict001.wmf`, `pict002.wmf`, and so on.
			 * This means files can be safely removed from the cwd without running the
			 * risk of removing any important files such as `package.json`, should an image
			 * ever have the same name
			 */
			const images = dom.window.document.querySelectorAll("img");
			/* istanbul ignore next: dependant on UnRTF version used */
			if (images.length > 0) {
				await Promise.all(
					Array.from(images, (image) => {
						const { src } = image;
						image.remove();
						/**
						 * `rm()` used instead of `unlink()` because concurrent requests may create duplicate files,
						 * which could cause `unlink()` to throw an ENOENT error if the file has already been removed
						 * by another request's call of this hook
						 */
						return rm(path.joinSafe(process.cwd(), src), {
							force: true,
							maxRetries: 10,
							recursive: true,
							retryDelay: 100,
						});
					})
				);
			}

			/**
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * Refer to https://i18nqa.com/debug/utf8-debug.html for more info
			 */
			req.conversionResults.body = fixUtf8(dom.serialize());
		} catch (err) {
			/**
			 * UnRTF will throw if the .rtf file provided
			 * by client is malformed, thus client error code
			 */
			if (err.message.includes("File is not the correct media type")) {
				throw server.httpErrors.badRequest();
			}

			throw err;
		}
		res.type("text/html; charset=utf-8");
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "rtf-to-html",
	dependencies: ["@fastify/sensible"],
});
