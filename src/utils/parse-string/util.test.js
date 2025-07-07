"use strict";

const { describe, expect, it } = require("@jest/globals");
const util = require(".");

describe("Parse-String util", () => {
	it("Converts string 'false' to boolean 'false'", () => {
		const response = util("false");
		expect(response).toBe(false);
	});

	it("Converts string 'true' to boolean 'true'", () => {
		const response = util("true");
		expect(response).toBe(true);
	});

	it("Converts string number to number", () => {
		const response = util("10");
		expect(response).toBe(10);
	});

	it("Returns string if string cannot be converted to either boolean or number", () => {
		const response = util("test");
		expect(response).toBe("test");
	});

	it("Returns object", () => {
		const response = util({});
		expect(response).toStrictEqual({});
	});
});
