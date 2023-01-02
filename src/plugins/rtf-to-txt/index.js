/* eslint-disable security/detect-non-literal-fs-filename */
const fp = require("fastify-plugin");
const fs = require("fs/promises");
const glob = require("glob");
const path = require("upath");
const { UnRTF } = require("node-unrtf");
const { randomUUID } = require("crypto");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses UnRTF to convert Buffer containing
 * RTF file in `req.body` to TXT and places RTF file in a temporary directory.
 * `req` object is decorated with `conversionResults` object detailing document
 * location and contents.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.binPath - Path to UnRTF binary.
 * @param {object=} options.rtfToTxtOptions - Refer to
 * https://github.com/Fdawgs/node-unrtf/blob/master/API.md
 * for options.
 * @param {string} options.tempDir - Directory for temporarily storing
 * files during conversion.
 */
async function plugin(server, options) {
	const directory = path.normalizeTrim(options.tempDir);
	const unrtf = new UnRTF(options.binPath);

	// Create temp directory if missing
	try {
		await fs.mkdir(directory);
	} catch (err) {
		// Ignore "EEXIST: An object by the name pathname already exists" error
		/* istanbul ignore if */
		if (err.code !== "EEXIST") {
			throw err;
		}
	}

	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	/**
	 * "onSend" hook used instead of "onResponse" ensures
	 * cancelled request temp data is also removed
	 */
	server.addHook("onSend", async (req, res, payload) => {
		if (req?.conversionResults?.docLocation) {
			// Remove files from temp directory after response sent
			const files = glob.sync(
				`${path.joinSafe(
					req.conversionResults.docLocation.directory,
					req.conversionResults.docLocation.id
				)}*`
			);

			await Promise.all(files.map((file) => fs.unlink(file)));
		}

		return payload;
	});

	server.addHook("preHandler", async (req, res) => {
		// Define any default settings the plugin should have to get up and running
		const config = {
			rtfToTxtOptions: {
				noPictures: true,
				outputText: true,
			},
		};
		Object.assign(config, options);

		// Build temporary file for UnRTF to write to, and following plugins to read from
		const id = `docsmith_rtf-to-txt_${randomUUID()}`;
		const tempFile = path.joinSafe(directory, `${id}.rtf`);
		req.conversionResults.docLocation = {
			directory,
			rtf: tempFile,
			id,
		};
		await fs.writeFile(tempFile, req.body);

		try {
			req.conversionResults.body = await unrtf.convert(
				tempFile,
				config.rtfToTxtOptions
			);

			// Remove metadata comments UnRTF adds to beginning of file
			req.conversionResults.body = req.conversionResults.body
				.replace(
					/^###\s{0,10}Translation\s?from\s?RTF\s?performed\s?by\s?UnRTF.*?-{17}/ims,
					""
				)
				.trim();
		} catch (err) {
			/**
			 * UnRTF will throw if the .rtf file provided
			 * by client is malformed, thus client error code
			 */
			/* istanbul ignore else: unable to test unknown errors */
			if (/File is not the correct media type/.test(err)) {
				throw server.httpErrors.badRequest();
			} else {
				throw err;
			}
		}

		res.type("text/plain");
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "rtf-to-txt",
	dependencies: ["@fastify/sensible"],
});
