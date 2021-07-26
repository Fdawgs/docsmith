const { createScheduler, createWorker } = require("tesseract.js");
const os = require("os");
const path = require("path");

/**
 * @author Frazer Smith
 * @description Utility to convert images of text to text strings,
 * using Tesseract Optical Character Recognition (OCR) engine.
 * @param {Array.<string|Buffer>} images - Array of image paths, Buffers
 * storing a binary image, or base64 encoded images.
 * @param {string=} languages - Languages to load trained data for.
 * Multiple languages are concatenated with a `+` i.e. `eng+chi_tra`
 * for English and Chinese Traditional languages.
 * @returns {Promise<Array.<string>|Error>} Promise of text retrieved
 * from image as array on resolve, or Error object on rejection.
 */
module.exports = async function util(images, languages) {
	if (images === undefined || Object.keys(images).length === 0) {
		throw new Error("Cannot convert images");
	}

	const scheduler = createScheduler();
	/**
	 * Defining the cache as `readOnly` and specifying both a cache and lang path
	 * stops Tesseract from constantly downloading new trained data from a remote
	 * repo (allowing OCR to be used offline), and stops requests trying to read
	 * and write simulationeously, which corrupted the trained data
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

	// Procedurely create workers based on number of processors available
	await Promise.all(
		os.cpus().map(async () => {
			const worker = createWorker(workerConfig);
			await worker.load();
			await worker.loadLanguage(languages);
			await worker.initialize(languages);
			await worker.setParameters(workerParams);
			scheduler.addWorker(worker);
		})
	);

	const results = await Promise.all(
		images.map(async (image) => {
			try {
				const {
					data: { text },
				} = await scheduler.addJob("recognize", image);

				return Promise.resolve(text);
			} catch (err) {
				return Promise.reject(err);
			}
		})
	);

	await scheduler.terminate();

	return results;
};
