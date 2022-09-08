const fp = require("fastify-plugin");
const js2xmlparser = require("js2xmlparser");
const secJSON = require("secure-json-parse");

/**
 * @author Frazer Smith
 * @description On-send plugin that adds support for serialization
 * of application/json responses, allowing them to be returned as XML
 * if the accepts request header only includes "application/xml"
 * or if it explicitly includes the "application/xml" media type
 * before "application/json".
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onSend", async (req, res, payload) => {
		/**
		 * Ensure it does not attempt to serialise non-JSON responses,
		 * by default Fastify sets response type to application/json
		 * if it has not been explicitly defined
		 */
		if (
			res.getHeader("content-type")?.includes("application/json") &&
			/**
			 * If XML is the only accepted response type or if XML is the
			 * preferred response type if both XML and JSON are declared
			 */
			req.accepts().type(["application/json", "application/xml"]) ===
				"application/xml"
		) {
			let parsedPayload = payload;

			try {
				parsedPayload = secJSON.parse(payload);
			} catch (err) {
				// Do nothing, payload already object
			}

			/* istanbul ignore else */
			if (
				typeof parsedPayload === "object" &&
				// Swagger and OpenAPI spec elements use characters not allowed in XML names (i.e. "$schema")
				parsedPayload?.openapi === undefined &&
				parsedPayload?.swagger === undefined
			) {
				res.type("application/xml; charset=utf-8");
				return js2xmlparser.parse("response", parsedPayload, {
					format: {
						doubleQuotes: true,
					},
					declaration: {
						encoding: "UTF-8",
					},
				});
			}
		}

		return payload;
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "serialize-json-to-xml",
	dependencies: ["@fastify/accepts"],
});
