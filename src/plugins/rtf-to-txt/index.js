/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
const createError = require("http-errors");
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
 * RTF file in `req.body` to TXT and places RTF file in a temporary directory.
 * `req` object is decorated with `rtfToTxtResults` object detailing document
 * location, contents etc.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Fastify config values.
 * @param {string} options.unrtf.binPath - Obfuscation values.
 * @param {object=} options.unrtf.rtfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-unrtf/blob/master/API.md
 * for options.
 * @param {string} options.unrtf.tempDirectory - directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	server.addHook("onRequest", async (req) => {
		req.rtfToTxtResults = { body: undefined, docLocation: {} };
	});

	server.addHook("onResponse", (req) => {
		// Remove files from temp directory after response sent
		const files = glob.sync(
			`${req.rtfToTxtResults.docLocation.directory}/${req.rtfToTxtResults.docLocation.id}*`
		);
		files.forEach((file) => {
			fs.unlinkSync(file);
		});
	});

	server.addHook("preHandler", async (req, res) => {
		try {
			// `convert` node-unrtf function still attempts to parse empty bodies/buffers
			//  and produces results, so catch them here
			if (req.body === undefined || req.body.length === 0) {
				throw new Error();
			}

			// Define any default settings the middleware should have to get up and running
			const config = {
				binPath: undefined,
				rtfToTxtOptions: {
					noPictures: true,
					outputText: true,
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
			req.rtfToTxtResults.body = await unrtf.convert(
				tempFile,
				config.rtfToTxtOptions
			);

			req.rtfToTxtResults.docLocation = {
				directory: config.tempDirectory,
				rtf: tempFile,
				id,
			};

			res.header("content-type", `text/plain`);
		} catch (err) {
			server.log.error(err);
			res.send(createError(400, err));
		}
	});
}

module.exports = fp(plugin);
