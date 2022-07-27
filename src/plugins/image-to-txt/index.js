const fp = require("fastify-plugin");
const { createScheduler, createWorker } = require("tesseract.js");
const path = require("upath");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds Tesseract Scheduler and Workers.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.languages - Languages to load trained data for.
 * Multiple languages are concatenated with a `+` i.e. `eng+chi_tra`
 * for English and Chinese Traditional languages.
 * @param {number} options.workers - Number of Tesseract Workers
 * to create.
 */
async function plugin(server, options) {
	server.log.info("Setting up Tesseract OCR scheduler and workers");
	const scheduler = createScheduler();

	/**
	 * Defining the cache as read-only, and specifying the cache, core, lang, and worker
	 * paths stops Tesseract from repeatedly downloading new trained data and workers
	 * from a remote repo, allowing OCR to be used offline.
	 * This also stops synchronous read/writes of the trained data,
	 * which corrupts the trained data
	 */
	const workerConfig = {
		cacheMethod: "readOnly",
		cachePath: path.joinSafe(__dirname, "../../.."),
		corePath: path.joinSafe(
			__dirname,
			"../../../node_modules/tesseract.js-core/tesseract-core.wasm.js"
		),
		langPath: path.joinSafe(__dirname, "../../../ocr_lang_data"),
		workerPath: path.joinSafe(
			__dirname,
			"../../../node_modules/tesseract.js/src/worker-script/node/index.js"
		),
	};

	/**
	 * Disable HOCR (HTML representation of OCR results) and TSV (tab-separated values)
	 * in output, not needed
	 */
	const workerParams = {
		tessjs_create_hocr: "0",
		tessjs_create_tsv: "0",
	};

	// Procedurally create workers based on number passed
	await Promise.all(
		Array(options.workers)
			.fill(0)
			.map(async () => {
				const worker = createWorker(workerConfig);
				await worker.load();
				await worker.loadLanguage(options.languages);
				await worker.initialize(options.languages);
				await worker.setParameters(workerParams);
				scheduler.addWorker(worker);
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

module.exports = fp(plugin, { fastify: "4.x", name: "image-to-txt" });
