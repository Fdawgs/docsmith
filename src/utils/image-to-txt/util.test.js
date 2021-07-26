const util = require(".");

describe("Image-to-TXT utility", () => {
	test("Should read text from image file", async () => {
		const test = await util(
			["./test_resources/test_files/valid_bullet_issues001.png"],
			"eng"
		);

		expect(Array.isArray(test)).toBe(true);
		expect(test.join(" ").substring(0, 24)).toBe(
			"Yeovil District Hospital"
		);
	});

	test("Should return error if file missing", async () => {
		await expect(util()).rejects.toThrow(
			new Error("Cannot convert images")
		);
	});
});
