"use strict";

const util = require(".");

describe("Core-Count util", () => {
	it("Returns count of physical cores", async () => {
		const response = await util();
		expect(response).toStrictEqual(expect.any(Number));
		expect(response).toBeGreaterThan(0);
	});
});
