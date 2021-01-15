const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

describe("register", () => {
	describe("GET requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		afterAll(() => {
			server.close();
		});

		test("Should return documents from register", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/healthcheck",
			});

			expect(response.statusCode).toEqual(200);
			expect(response.payload).toEqual("ok");
		});
	});
});
