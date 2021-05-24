const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

describe("Healthcheck Route", () => {
	describe("GET Requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		test("Should return `ok`", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/healthcheck",
			});

			expect(response.statusCode).toEqual(200);
			expect(response.payload).toEqual("ok");
		});
	});
});
