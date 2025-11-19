"use strict";

const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require("../src/routes/docs");
const getConfig = require("../src/config");
const sharedSchemas = require("../src/plugins/shared-schemas");

describe("Docs route", () => {
	describe("GET requests", () => {
		let config;
		/** @type {Fastify.FastifyInstance} */
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

		afterAll(async () => server.close());

		it("Returns HTML", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "text/html",
				},
			});

			expect(response.body).toMatchSnapshot();
			expect(response.headers).toMatchObject({
				"cache-control": "public, max-age=300",
				"content-type": "text/html; charset=utf-8",
			});
			expect(response.statusCode).toBe(200);
		});

		it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
				headers: {
					accept: "application/javascript",
				},
			});

			expect(response.json()).toStrictEqual({
				error: "Not Acceptable",
				message: "Not Acceptable",
				statusCode: 406,
			});
			expect(response.statusCode).toBe(406);
		});
	});
});
