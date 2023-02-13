const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

describe("Healthcheck route", () => {
	describe("GET requests", () => {
		let config;
		let server;

		beforeAll(async () => {
			config = await getConfig();

			server = Fastify();
			await server
				.register(accepts)
				.register(sensible)
				.register(sharedSchemas)
				.register(route, config)
				.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		test("Should return `ok`", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "text/plain",
				},
			});

			expect(response.payload).toBe("ok");
			expect(response.statusCode).toBe(200);
		});

		test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "application/javascript",
				},
			});

			expect(JSON.parse(response.payload)).toEqual({
				error: "Not Acceptable",
				message: "Not Acceptable",
				statusCode: 406,
			});
			expect(response.statusCode).toBe(406);
		});
	});
});
