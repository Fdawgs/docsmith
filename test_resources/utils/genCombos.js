/* eslint-disable security/detect-object-injection */
const btPowerSetRecursive = require("./btPowerSet");

/**
 * @description Utility function to generate unique combinations when provided with an
 * array of objects
 * @param {Array.<object>} originalSet - Array of objects.
 * @returns {Array} All subsets of array of objects provided.
 */
function generateCombos(originalSet) {
	const powerSet = btPowerSetRecursive(originalSet);

	let reducedPowerSet = [];

	// Combine resulting array of objects from `btPowerSetRecursive()`
	powerSet.forEach((assArray) => {
		reducedPowerSet.push(
			JSON.stringify(
				assArray.reduce((previousValue, currentValue) => {
					const result = previousValue;
					Object.keys(currentValue).forEach((key) => {
						if (
							Object.prototype.hasOwnProperty.call(
								currentValue,
								key
							)
						) {
							result[key] = currentValue[key];
						}
					});

					return result;
				}, {})
			)
		);
	});

	// Remove duplicate objects
	const powerSetSet = new Set(reducedPowerSet);
	reducedPowerSet = [];
	powerSetSet.forEach((obj) => {
		reducedPowerSet.push(JSON.parse(obj));
	});

	return reducedPowerSet;
}

module.exports = generateCombos;
