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
	summary: "Convert PDF documents to TXT format",
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
			"outputEncoding",
			S.string()
				.default("UTF-8")
				.description("Sets the encoding to use for text output")
		)
		.prop(
			"ownerPassword",
			S.string().description("Owner password (for encrypted files)")
		)
		.prop(
			"rawLayout",
			S.boolean().description(
				"Keep the text in content stream order. This is a hack which often 'undoes' column formatting, etc. Use of raw mode is no longer recommended"
			)
		)
		.prop(
			"userPassword",
			S.string().description("User password (for encrypted files)")
		),
	response: {
		200: S.string(),
	},
};

module.exports = { pdfToTxtPostSchema };
