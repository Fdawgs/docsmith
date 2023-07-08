"use strict";

const S = require("fluent-json-schema").default;

const tags = ["PDF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const pdfToTxtPostSchema = {
	tags,
	summary: "Convert PDF to TXT",
	description:
		"Returns the result of converting a PDF document to TXT or simple HTML format.",
	operationId: "postPdfToTxt",
	consumes: ["application/pdf"],
	produces: ["application/json", "application/xml"],
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
		),
	response: {
		200: {
			content: {
				"text/html": {
					schema: {
						type: "string",
					},
				},
				"text/plain": {
					schema: {
						type: "string",
					},
				},
			},
		},
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
		),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/properties/unsupportedMediaType").description(
			"Unsupported Media Type"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		500: S.ref("responses#/properties/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

/* istanbul ignore next */
if (process.env?.OCR_ENABLED === "true") {
	const baseQuerySchema = pdfToTxtPostSchema.query;

	pdfToTxtPostSchema.query = S.object()
		.prop(
			"ocr",
			S.boolean().description(
				"Use Tesseract Optical Character Recognition (OCR) engine to attempt to read text from files that are composed of images or scans of documents. <strong>Please note that this is resource intensive and slow</strong>"
			)
		)
		.extend(baseQuerySchema);
}

module.exports = { pdfToTxtPostSchema };
