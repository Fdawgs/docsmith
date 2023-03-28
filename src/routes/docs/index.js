const path = require("upath");

// Import plugins
const staticPlugin = require("@fastify/static");

const { docsGetSchema } = require("./schema");

const accepts = ["text/html"];

/**
 * @author Frazer Smith
 * @description Returns HTML for docs page.
 * @param {object} opts - Options object.
 * @param {string} opts.scriptNonce - Nonce for script tag.
 * @param {string} opts.styleNounce - Nonce for style tag.
 * @returns {string} HTML for docs page.
 */
function indexHtml(opts) {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="description" content="Reference documentation and OpenAPI definitions for Docsmith." />
		<meta name="author" content="Frazer Smith" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link rel="preload" href="/public/docs.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />

		<!-- Icons -->
		<link rel="apple-touch-icon" sizes="120x120" href="/public/images/icons/apple-touch-icon-120x120.png" />
		<link rel="apple-touch-icon" sizes="152x152" href="/public/images/icons/apple-touch-icon-152x152.png" />
		<link rel="apple-touch-icon" sizes="167x167" href="/public/images/icons/apple-touch-icon-167x167.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/public/images/icons/apple-touch-icon-180x180.png" />
		<link rel="shortcut icon" type="image/x-icon" href="/public/images/icons/favicon.ico" />
		<link rel="mask-icon" color="#005EB8" href="/public/images/icons/mask-icon.svg" />
		<meta name="theme-color" content="#005EB8" />

		<title>Docsmith | Documentation</title>
	</head>
	<body>
		<script nonce="${opts.scriptNonce}">
			// Redoc no longer supports IE, see https://github.com/Redocly/redoc/issues/1936
			if (window.document.documentMode) {
				var p = document.createElement("p");
				p.innerHTML =
					"This browser is no longer supported by this page. <br>Please switch to a more modern browser such as Google Chrome, Microsoft Edge, or Mozilla Firefox.";
				document.body.insertBefore(p, document.body.firstChild);
			}
		</script>
		<redoc spec-url="docs/openapi" disable-search hide-hostname nonce="${opts.styleNounce}"></redoc>
		<script src="docs/redoc/redoc.standalone.js" defer nonce="${opts.scriptNonce}"></script>
	</body>
</html>
`;
}

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 */
async function route(server) {
	// Register plugins
	await server
		// Register redoc module to allow for standalone js and map to be used in docs.html
		.register(staticPlugin, {
			root: path.joinSafe(
				__dirname,
				"..",
				"..",
				"..",
				"node_modules",
				"redoc",
				"bundles"
			),
			allowedPath: (pathName) =>
				pathName.match(/\/redoc\.standalone\.js(?:.map|)/),
			decorateReply: false,
			maxAge: "1 day",
			prefix: "/redoc/",
		});

	server.route({
		method: "GET",
		url: "/",
		schema: docsGetSchema,
		onRequest: async (req) => {
			if (
				// Catch unsupported Accept header media types
				!req.accepts().type(accepts)
			) {
				throw server.httpErrors.notAcceptable();
			}
		},
		handler: (_req, res) => {
			res.header("cache-control", "public, max-age=300")
				.removeHeader("pragma")
				.removeHeader("expires")
				.removeHeader("surrogate-control")
				.type("text/html; charset=utf-8")
				.send(
					indexHtml({
						scriptNonce: res.cspNonce?.script,
						styleNounce: res.cspNonce?.style,
					})
				);
		},
	});
}

module.exports = route;
