"use strict";

const { join } = require("node:path");
const fp = require("fastify-plugin");
const { createScheduler, createWorker } = require("tesseract.js");

/**
 * Defining the cache as read-only, and specifying the cache, core, lang, and worker
 * paths stops Tesseract from repeatedly downloading new trained data and workers
 * from a remote repo, allowing OCR to be used offline.
 * This also stops synchronous read/writes of the trained data,
 * which corrupts the trained data.
 */
const TESSERACT_WORKER_OPTS = {
	cacheMethod: "readOnly",
	cachePath: join(__dirname, "../../.."),
	corePath: join(__dirname, "../../../node_modules/tesseract.js-core"),
	langPath: join(__dirname, "../../../ocr_lang_data"),
	workerPath: join(
		__dirname,
		"../../../node_modules/tesseract.js/src/worker-script/node/index.js"
	),
};

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds the `tesseract` function,
 * which exposes the Tesseract OCR scheduler to convert images to TXT.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.languages - Languages to load trained data for.
 * Multiple languages are concatenated with a `+` i.e. `eng+cym`
 * for English and Welsh languages.
 * @param {number} options.workers - Number of Tesseract Workers
 * to create.
 */
async function plugin(server, options) {
	server.log.info("Setting up Tesseract OCR scheduler and workers");
	const scheduler = createScheduler();

	// Procedurally create workers based on number passed
	await Promise.all(
		Array.from({ length: options.workers }, async () => {
			const worker = await createWorker(
				options.languages,
				1,
				TESSERACT_WORKER_OPTS
			);
			return scheduler.addWorker(worker);
		})
	);

	server.log.info(
		`${scheduler.getNumWorkers()} Tesseract OCR workers deployed`
	);

	server.decorate("tesseract", scheduler);
	server.addHook("onClose", async () => {
		server.log.info("Terminating Tesseract OCR scheduler and workers");
		await scheduler.terminate();
	});
}

module.exports = fp(plugin, { fastify: "5.x", name: "image-to-txt" });
