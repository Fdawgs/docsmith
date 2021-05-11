/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const Fastify = require("fastify");
const isHtml = require("is-html");
const raw = require("raw-body");
const plugin = require(".");
const getConfig = require("../../config");

/**
 * Used to check that common incorrectly converted Windows-1252
 * to UTF-8 values are removed by the `fix-utf8` module
 */
const artifacts =
	/â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥|Â|Ã|â€|�/g;

describe("PDF-to-HTML Conversion Plugin", () => {
	let config;
	let server;

	// TODO Add afterall to remove leftover PDFs from ./temp

	beforeAll(async () => {
		config = await getConfig();
	});

	beforeEach(() => {
		server = Fastify();

		server.addContentTypeParser("application/pdf", async (req, payload) => {
			const res = await raw(payload);
			return res;
		});

		server.post("/", async (req, res) => {
			res.header("content-type", "application/json");
			res.send(req.pdfToHtmlResults);
		});
	});

	afterEach(() => {
		server.close();
	});

	test("Should convert PDF file to HTML and place in specified directory", async () => {
		server.register(plugin, config);

		let response = await server.inject({
			method: "POST",
			url: "/",
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			query: {
				lastPageToConvert: 2,
				ignoreImages: false,
			},
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("The&nbsp;NHS&nbsp;Constitution")
		);
		expect(response.body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(response.body)).toBe(true);
		expect(typeof response.docLocation).toBe("object");
		expect(fs.existsSync(response.docLocation.html)).toBe(false);
		expect(fs.existsSync(config.poppler.tempDirectory)).toBe(true);
	});

	test("Should ignore invalid `test` query string params and convert PDF file to HTML", async () => {
		server.register(plugin, config);

		let response = await server.inject({
			method: "POST",
			url: "/",
			query: {
				firstPageToConvert: 2,
				ignoreImages: true,
				lastPageToConvert: 2,
				test: "test",
			},
			body: fs.readFileSync(
				"./test_resources/test_files/pdf_1.3_NHS_Constitution.pdf"
			),
			headers: {
				"content-type": "application/pdf",
			},
		});

		response = JSON.parse(response.payload);

		expect(response.body).toEqual(
			expect.stringContaining("The&nbsp;NHS&nbsp;Constitution")
		);
		expect(response.body).not.toEqual(expect.stringMatching(artifacts));
		expect(isHtml(response.body)).toBe(true);
		expect(typeof response.docLocation).toBe("object");
		expect(fs.existsSync(response.docLocation.html)).toBe(false);
		expect(fs.existsSync(config.poppler.tempDirectory)).toBe(true);
	});

	test("Should return HTTP 400 error if PDF file is missing", async () => {
		server.register(plugin, config);

		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				"content-type": "application/pdf",
			},
		});

		const body = JSON.parse(response.payload);

		expect(response.statusCode).toBe(400);
		expect(response.statusMessage).toBe("Bad Request");
		expect(body.statusCode).toBe(400);
		expect(body.error).toBe("Bad Request");
	});
});
