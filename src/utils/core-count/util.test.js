const util = require(".");

describe("Core-Count util", () => {
	test("Should return count of physical cores", () => {
		const response = util();
		expect(response).toEqual(expect.any(Number));
	});
});
