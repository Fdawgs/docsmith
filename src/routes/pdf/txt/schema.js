const S = require("fluent-json-schema");

const tags = ["PDF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const pdfToTxtPostSchema = {
	tags,
	summary: "Convert PDF to TXT",
	description:
		"Returns the result of converting a PDF document to TXT or simple HTML format.",
	operationId: "postPdfToTxt",
	consumes: ["application/pdf"],
	produces: ["text/html", "text/plain"],
	query: S.object()
		.prop(
			"boundingBoxXhtml",
			S.boolean().description(
				"Generate an XHTML file containing bounding box information for each word in the file"
			)
		)
		.prop(
			"boundingBoxXhtmlLayout",
			S.boolean().description(
				"Generate an XHTML file containing bounding box information for each block, line, and word in the file"
			)
		)
		.prop(
			"cropHeight",
			S.number().description(
				"Specifies the height of crop area in pixels (image output) or points (vector output)"
			)
		)
		.prop(
			"cropWidth",
			S.number().description(
				"Specifies the width of crop area in pixels (image output) or points (vector output)"
			)
		)
		.prop(
			"cropXAxis",
			S.number().description(
				"Specifies the x-coordinate of the crop area top left corner in pixels (image output) or points (vector output)"
			)
		)
		.prop(
			"cropYAxis",
			S.number().description(
				"Specifies the y-coordinate of the crop area top left corner in pixels (image output) or points (vector output)"
			)
		)
		.prop(
			"eolConvention",
			S.string()
				.description(
					"Sets the end-of-line convention to use for text output"
				)
				.enum(["dos", "mac", "unix"])
		)
		.prop(
			"firstPageToConvert",
			S.number().default(1).description("First page to convert")
		)
		.prop(
			"fixedWidthLayout",
			S.number().description(
				"Assume fixed-pitch (or tabular) text, with the specified character width (in points). This forces physical layout mode"
			)
		)
		.prop(
			"generateHtmlMetaFile",
			S.boolean().description(
				"Generate simple HTML file, including the meta information. This simply wraps the text in `<pre>` and `</pre>` and prepends the meta headers"
			)
		)
		.prop(
			"lastPageToConvert",
			S.number().description("Last page to convert")
		)
		.prop(
			"listEncodingOptions",
			S.boolean().description("List the available encodings")
		)
		.prop(
			"maintainLayout",
			S.boolean().description(
				"Maintain (as best as possible) the original physical layout of the text. The default is to undo physical layout (columns, hyphenation, etc.) and output the text in reading order"
			)
		)
		.prop(
			"noDiagonalText",
			S.boolean().description("Discard diagonal text")
		)
		.prop(
			"noPageBreaks",
			S.boolean().description(
				"Do not insert page breaks (form feed characters) between pages"
			)
		)
		.prop(
			"ocr",
			S.boolean().description(
				"Use Tesseract Optical Character Recognition (OCR) engine to attempt to read text from files that are composed of images or scans of documents. <strong>Please note that this is resource intensive and slow</strong>"
			)
		)
		.prop(
			"outputEncoding",
			S.string()
				.default("UTF-8")
				.description("Sets the encoding to use for text output")
				.pattern(/^[-a-zA-Z0-9_]+$/m)
		)
		.prop(
			"ownerPassword",
			S.string()
				.description("Owner password (for encrypted files)")
				/**
				 * PDFs had a max character length of 32 up to PDF 1.7;
				 * later versions that changed to 127 bytes
				 */
				.maxLength(127)
		)
		.prop(
			"rawLayout",
			S.boolean().description(
				"Keep the text in content stream order. This is a hack which often 'undoes' column formatting, etc. Use of raw mode is no longer recommended"
			)
		)
		.prop(
			"userPassword",
			S.string()
				.description("User password (for encrypted files)")
				/**
				 * PDFs had a max character length of 32 up to PDF 1.7;
				 * later versions that changed to 127 bytes
				 */
				.maxLength(127)
		)
		/**
		 * Return all schema values as JSON object rather than Fluent Schema Object.
		 * Allows for ocr param to be removed if needed in `index.js` before schema is
		 * passed to `route()`.
		 */
		.valueOf(),
	response: {
		200: S.string(),
		400: S.ref("responses#/definitions/badRequest").description(
			"Bad Request"
		),
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/definitions/unsupportedMediaType").description(
			"Unsupported Media Type"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { pdfToTxtPostSchema };
