const util = require(".");

describe("Core-Count util", () => {
	it("Returns count of physical cores", () => {
		const response = util();
		expect(response).toEqual(expect.any(Number));
	});
});
