/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
const fp = require("fastify-plugin");
const fs = require("fs");
const fsp = require("fs").promises;
const glob = require("glob");
const path = require("path");
const { UnRTF } = require("node-unrtf");
const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses UnRTF to convert Buffer containing
 * RTF file in `req.body` to TXT and places RTF file in a temporary directory.
 * `req` object is decorated with `conversionResults` object detailing document
 * location and contents.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to UnRTF binary.
 * @param {object=} options.rtfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-unrtf/blob/master/API.md
 * for options.
 * @param {string=} options.tempDirectory - Directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	// "onSend" hook used instead of "onResponse" ensures
	// cancelled request temp data is also removed
	server.addHook("onSend", (req, res) => {
		if (req?.conversionResults?.docLocation) {
			// Remove files from temp directory after response sent
			const files = glob.sync(
				`${req.conversionResults.docLocation.directory}/${req.conversionResults.docLocation.id}*`
			);
			files.forEach((file) => {
				fs.unlinkSync(file);
			});
		}

		return res;
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// Define any default settings the plugin should have to get up and running
			const config = {
				binPath: undefined,
				rtfToTxtOptions: {
					noPictures: true,
					outputText: true,
				},
				tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
			};
			Object.assign(config, options);

			const unrtf = new UnRTF(config.binPath);

			// Create temp directory if missing
			try {
				await fsp.access(config.tempDirectory);
			} catch (err) {
				await fsp.mkdir(config.tempDirectory);
			}

			// Build temporary file for UnRTF to write to, and following plugins to read from
			const id = v4();
			const tempFile = `${config.tempDirectory}${id}.rtf`;
			req.conversionResults.docLocation = {
				directory: config.tempDirectory,
				rtf: tempFile,
				id,
			};
			await fsp.writeFile(tempFile, req.body);

			/**
			 * `fixUtf8` function replaces most common incorrectly converted
			 * Windows-1252 to UTF-8 results with HTML equivalents.
			 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
			 */
			req.conversionResults.body = await unrtf.convert(
				tempFile,
				config.rtfToTxtOptions
			);

			res.header("content-type", `text/plain`);
		} catch (err) {
			server.log.error(err);
			res.badRequest(err);
		}
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "rtf-to-txt",
	dependencies: ["fastify-sensible"],
});
