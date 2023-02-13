const util = require(".");

describe("Parse-String util", () => {
	test("Should convert string 'false' to boolean 'false'", () => {
		const response = util("false");
		expect(response).toBe(false);
	});

	test("Should convert string 'true' to boolean 'true'", () => {
		const response = util("true");
		expect(response).toBe(true);
	});

	test("Should convert string number to number", () => {
		const response = util("10");
		expect(response).toBe(10);
	});

	test("Should return string if string cannot be converted to either boolean or number", () => {
		const response = util("test");
		expect(response).toBe("test");
	});

	test("Should return object", () => {
		const response = util({});
		expect(response).toEqual({});
	});
});
