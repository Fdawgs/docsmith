const fp = require("fastify-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require("puppeteer");

/**
 * @author Julian Matthews
 * @description Pre-handler plugin that uses puppeteer to convert Buffer containing
 * HTML in `req.body` to PDF.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {object=} options.htmlToPdfOptions - Options to pass to puppeteer
 */
async function plugin(server) {
	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req, res) => {
		// Define any default settings the plugin should have to get up and running
		const config = {
			htmlToPdfOptions: {
				margin: {
					top: "80px",
					right: "30px",
					bottom: "80px",
					left: "30px",
				},
				printBackground: true,
				format: "A4",
			},
		};

		try {
			// Create a headless browser instance
			const browser = await puppeteer.launch();

			// Create new page
			const page = await browser.newPage();

			// Get HTML content from req.body
			const html = req.body.toString();
			await page.setContent(html, { waitUntil: "domcontentloaded" });

			// Convert HTML To PDF (which is basically "printing" to PDF from the headless browser)
			const pdf = await page.pdf(config.htmlToPdfOptions);

			// Close the browser instance
			await browser.close();

			req.conversionResults.body = pdf;

			res.type("application/pdf");
		} catch {
			/**
			 * Catch all in case of failure.
			 */
			throw server.httpErrors.badRequest();
		}
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "html-to-pdf",
	dependencies: ["@fastify/sensible"],
});
