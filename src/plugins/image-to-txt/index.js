const fp = require("fastify-plugin");
const { createScheduler, createWorker } = require("tesseract.js");
const os = require("os");
const path = require("path");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds Tesseract Scheduler and Workers.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {string} options.languages - Languages to load trained data for.
 * Multiple languages are concatenated with a `+` i.e. `eng+chi_tra`
 * for English and Chinese Traditional languages.
 */
async function plugin(server, options) {
	server.log.info("Setting up Tesseract OCR scheduler and workers");
	const scheduler = createScheduler();
	/**
	 * Defining the cache as `readOnly` and specifying both a cache and lang path
	 * stops Tesseract from constantly downloading new trained data from a remote
	 * repo (allowing OCR to be used offline), and stops requests trying to read
	 * and write simultaneously, which corrupted the trained data
	 */
	const workerConfig = {
		cacheMethod: "readOnly",
		cachePath: path.join(__dirname, "../../.."),
		langPath: path.join(__dirname, "../../..", "ocr_lang_data"),
	};

	// Disable HOCR and TSV in output, not needed
	const workerParams = {
		tessjs_create_hocr: "0",
		tessjs_create_tsv: "0",
	};

	// Procedurally create workers based on number of processors available
	await Promise.all(
		os.cpus().map(async () => {
			const worker = createWorker(workerConfig);
			await worker.load();
			await worker.loadLanguage(options.languages);
			await worker.initialize(options.languages);
			await worker.setParameters(workerParams);
			scheduler.addWorker(worker);
		})
	);

	server.log.info(
		`${scheduler.getNumWorkers()} Tesseract OCR workers waiting`
	);

	server.decorate("tesseract", scheduler);
	server.addHook("onClose", async () => {
		server.log.info("Terminating Tesseract OCR scheduler and workers");
		scheduler.terminate();
	});
}

module.exports = fp(plugin, { fastify: "3.x", name: "image-to-txt" });
