const S = require("fluent-json-schema");

const tags = ["PDF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const pdfToHtmlPostSchema = {
	tags,
	summary: "Convert PDF documents to HTML format",
	operationId: "postPdfToHtml",
	consumes: ["application/pdf"],
	produces: ["text/html"],
	query: S.object()
		.prop(
			"backgroundColor",
			S.string()
				.description("HTML document background color")
				.examples(["white", "#FFFFFF"])
		)
		.prop(
			"exchangePdfLinks",
			S.boolean().description("Exchange `.pdf` links with `.html`")
		)
		.prop(
			"extractHidden",
			S.boolean().description("Force hidden text extraction")
		)
		.prop(
			"firstPageToConvert",
			S.number()
				.description("First page to convert")
				.default(1)
				.examples([1, 10])
				.minimum(1)
		)
		.prop(
			"fonts",
			S.string()
				.description(
					"Define the font(s) of the text in the returned HTML document"
				)
				.examples(["Arial", "Arial, Sans Serif"])
		)
		.prop(
			"fontFullName",
			S.boolean().description(
				"Output the font name without any substitutions"
			)
		)
		.prop("ignoreImages", S.boolean().description("Ignore images"))
		.prop(
			"imageFormat",
			S.string()
				.description("Image file format for Splash output")
				.enum(["JPG", "PNG"])
		)
		.prop(
			"lastPageToConvert",
			S.number().description("Last page to convert")
		)
		.prop(
			"noDrm",
			S.boolean().description("Override document DRM settings")
		)
		.prop(
			"noMergeParagraph",
			S.boolean().description("Do not merge paragraphs")
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
			"removeAlt",
			S.boolean().description("Remove the alt attribute from image tags")
		)
		.prop(
			"userPassword",
			S.string().description("User password (for encrypted files)")
		)
		.prop(
			"wordBreakThreshold",
			S.number()
				.default(10)
				.description(
					"Adjust the word break threshold percent. Word break occurs when distance between two adjacent characters is greater than this percent of character height"
				)
		)
		.prop(
			"zoom",
			S.number().default(1.5).description("Zoom the PDF document")
		),
	response: {
		200: S.string(),
	},
};

module.exports = { pdfToHtmlPostSchema };
