const util = require(".");

describe("Core-Count Util", () => {
	test("Should return count of physical cores", () => {
		const response = util();
		expect(response).toEqual(expect.any(Number));
	});
});
