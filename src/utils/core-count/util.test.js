"use strict";

const util = require(".");

describe("Core-Count util", () => {
	it("Returns count of physical cores", () => {
		const response = util();
		expect(response).toStrictEqual(expect.any(Number));
		expect(response).toBeGreaterThan(0);
	});
});
