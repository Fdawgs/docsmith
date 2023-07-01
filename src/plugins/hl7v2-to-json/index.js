const fp = require("fastify-plugin");
const hl7v2 = require("@redoxengine/redox-hl7-v2");

/**
 * @author Frazer Smith
 * @description Pre-handler plugin that uses redox-hl7-v2 to convert string containing
 * HL7 v2.x in `req.body` to JSON.
 * `req` object is decorated with `conversionResults.body` holding the converted document.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	const parser = new hl7v2.Parser();

	server.addHook("onRequest", async (req) => {
		req.conversionResults = { body: undefined };
	});

	server.addHook("preHandler", async (req) => {
		/**
		 * `htmlToText` function still attempts to parse empty bodies/input or invalid HTML
		 * and produces results, so catch them here
		 */
		// if (req.body === undefined || Object.keys(req.body).length === 0) {
		// 	throw server.httpErrors.badRequest();
		// }

		try {
			const results = parser.parse(req.body);
			req.conversionResults.body = results;
		} catch {
			/**
			 * redox-hl7-v2 will throw if the HL7 v2 message provided
			 * by client is malformed or invalid, thus client error code
			 */
			throw server.httpErrors.badRequest();
		}
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "hl7v2ToJson",
	dependencies: ["@fastify/sensible"],
});
