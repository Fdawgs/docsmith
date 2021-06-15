/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
const createError = require("http-errors");
const fixUtf8 = require("fix-utf8");
const fp = require("fastify-plugin");
const fs = require("fs");
const fsp = require("fs").promises;
const glob = require("glob");
const path = require("path");
const { UnRTF } = require("node-unrtf");
const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses UnRTF to convert Buffer or string of
 * RTF file in `req.body` to HTML and places RTF file in a temporary directory.
 * `req` object is decorated with `rtfToHtmlResults` object detailing document
 * location, contents etc.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Fastify config values.
 * @param {string} options.unrtf.binPath - Obfuscation values.
 * @param {object=} options.unrtf.rtfToHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-unrtf/blob/master/API.md
 * for options.
 * @param {string} options.unrtf.tempDirectory - directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.rtfToHtmlResults = { body: undefined, docLocation: {} };
	});

	server.addHook("onResponse", (req, res) => {
		// Remove files from temp directory after response sent
		const files = glob.sync(
			`${req.rtfToHtmlResults.docLocation.directory}/${req.rtfToHtmlResults.docLocation.id}*`
		);
		files.forEach((file) => {
			fs.unlinkSync(file);
		});

		return res;
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// Define any default settings the middleware should have to get up and running
			const config = {
				binPath: undefined,
				rtfToHtmlOptions: {
					noPictures: true,
					outputHtml: true,
				},
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			await Object.assign(config, options.unrtf);

			// Create temp directory if missing
			try {
				await fsp.access(config.tempDirectory);
			} catch (err) {
				await fsp.mkdir(config.tempDirectory);
			}

			// Build temporary file for UnRTF to write to, and following plugins to read from
			const id = v4();
			const tempFile = `${config.tempDirectory}${id}.rtf`;
			await fsp.writeFile(tempFile, req.body);

			const unrtf = new UnRTF(config.binPath);

			/**
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
			 */
			req.rtfToHtmlResults.body = await fixUtf8(
				await unrtf.convert(tempFile, config.rtfToHtmlOptions)
			);

			req.rtfToHtmlResults.docLocation = {
				directory: config.tempDirectory,
				rtf: tempFile,
				id,
			};

			res.header("content-type", `text/html`);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin);
