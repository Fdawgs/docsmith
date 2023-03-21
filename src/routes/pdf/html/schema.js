const S = require("fluent-json-schema");

const tags = ["PDF"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const pdfToHtmlPostSchema = {
	tags,
	summary: "Convert PDF to HTML",
	description:
		"Returns the result of converting a PDF document to HTML format.",
	operationId: "postPdfToHtml",
	consumes: ["application/pdf"],
	produces: ["application/json", "application/xml"],
	query: S.object()
		.additionalProperties(false)
		.prop(
			"backgroundColor",
			S.string()
				.description(
					"HTML document background color; replace the `background-color` CSS property for `<div>` elements"
				)
				.pattern(/^[#a-zA-Z0-9()%, .]+$/m)
				.examples([
					"white",
					"#FFFFFF",
					"rgb(255, 255, 128)",
					"hsla(50, 33%, 25%, 0.75)",
				])
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
			"language",
			S.string()
				.description(
					"Set the `lang` and `xml:lang` attributes of the `<html>` tag. Must be a valid IANA language tag"
				)
				.pattern(/^[-a-zA-Z0-9]+$/m)
				.default("en")
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
				.pattern(/^[-\w]+$/m)
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
			"removeAlt",
			S.boolean().description(
				"Set the `alt` attribute in `<img>` tags to an empty string"
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
		200: {
			content: {
				"text/html": {
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

module.exports = { pdfToHtmlPostSchema };
