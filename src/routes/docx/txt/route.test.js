/* eslint-disable security/detect-non-literal-fs-filename -- Test files are not user-provided */

"use strict";

const { readFile } = require("node:fs/promises");
const { afterAll, beforeAll, describe, expect, it } = require("@jest/globals");
const accepts = require("@fastify/accepts");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

describe("DOCX-to-TXT route", () => {
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

	it.each([
		{
			testName: "DOCM file",
			filePath: "./test_resources/test_files/docm_valid.docm",
			headers: {
				"content-type":
					"application/vnd.ms-word.document.macroEnabled.12",
			},
		},
		{
			testName: "DOCX file",
			filePath: "./test_resources/test_files/docx_valid.docx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		},
		{
			testName: "DOTX file",
			filePath: "./test_resources/test_files/dotx_valid.dotx",
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		},
		{
			testName: "DOTM file",
			filePath: "./test_resources/test_files/dotm_valid.dotm",
			headers: {
				"content-type":
					"application/vnd.ms-word.template.macroEnabled.12",
			},
		},
	])("Returns $testName converted to TXT", async ({ filePath, headers }) => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(filePath),
			headers: {
				accept: "application/json, text/plain",
				...headers,
			},
		});

		expect(response.body).toMatchSnapshot();
		expect(response.headers).toMatchObject({
			"content-type": "text/plain; charset=utf-8",
		});
		expect(response.statusCode).toBe(200);
	});

	it("Returns HTTP status code 400 if body is missing", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			headers: {
				accept: "application/json, text/plain",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Bad Request",
			message: "Body cannot be empty",
			statusCode: 400,
		});
		expect(response.statusCode).toBe(400);
	});

	it.each([
		{
			testName: "is not a valid DOCM file",
			body: Buffer.from("test"),
			headers: {
				"content-type":
					"application/vnd.ms-word.document.macroEnabled.12",
			},
		},
		{
			testName: "is not a valid DOCX file",
			body: Buffer.from("test"),
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			},
		},
		{
			testName: "is not a valid DOTM file",
			body: Buffer.from("test"),
			headers: {
				"content-type":
					"application/vnd.ms-word.template.macroEnabled.12",
			},
		},
		{
			testName: "is not a valid DOTX file",
			body: Buffer.from("test"),
			headers: {
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			},
		},
	])(
		"Returns HTTP status code 415 if body $testName",
		async ({ body, headers }) => {
			const response = await server.inject({
				method: "POST",
				url: "/",
				body,
				headers: {
					accept: "application/json, text/plain",
					...headers,
				},
			});

			expect(response.json()).toStrictEqual({
				error: "Unsupported Media Type",
				message: "Unsupported Media Type",
				statusCode: 415,
			});
			expect(response.statusCode).toBe(415);
		}
	);

	it("Returns HTTP status code 415 if file media type is not supported by route", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile(
				"./test_resources/test_files/html_valid_empty.html"
			),
			headers: {
				accept: "application/json, text/plain",
				"content-type": "application/html",
			},
		});

		expect(response.json()).toStrictEqual({
			error: "Unsupported Media Type",
			message: "Unsupported Media Type: application/html",
			statusCode: 415,
		});
		expect(response.statusCode).toBe(415);
	});

	it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
		const response = await server.inject({
			method: "POST",
			url: "/",
			body: await readFile("./test_resources/test_files/docx_valid.docx"),
			headers: {
				accept: "application/javascript",
				"content-type":
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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
