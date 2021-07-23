const { createScheduler, createWorker } = require("tesseract.js");
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

	const worker1 = createWorker(workerConfig);
	await worker1.load();
	await worker1.loadLanguage(languages);
	await worker1.initialize(languages);
	await worker1.setParameters(workerParams);

	const worker2 = createWorker(workerConfig);
	await worker2.load();
	await worker2.loadLanguage(languages);
	await worker2.initialize(languages);
	await worker2.setParameters(workerParams);

	const worker3 = createWorker(workerConfig);
	await worker3.load();
	await worker3.loadLanguage(languages);
	await worker3.initialize(languages);
	await worker3.setParameters(workerParams);

	const worker4 = createWorker(workerConfig);
	await worker4.load();
	await worker4.loadLanguage(languages);
	await worker4.initialize(languages);
	await worker4.setParameters(workerParams);

	scheduler.addWorker(worker1);
	scheduler.addWorker(worker2);
	scheduler.addWorker(worker3);
	scheduler.addWorker(worker4);

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
