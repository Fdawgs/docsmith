const btPowerSetRecursive = require("./btPowerSet");

/**
 * @author Frazer Smith
 * @description Utility function to generate unique combinations when provided with an
 * array of objects
 * @param {Array.<object>} originalSet - Array of objects.
 * @returns {Array} All subsets of array of objects provided.
 */
function generateCombos(originalSet) {
	const powerSet = btPowerSetRecursive(originalSet);

	// Combine resulting array of arrays of objects from `btPowerSetRecursive()`
	// into a single array of combined objects
	const reducedPowerSet = powerSet.map((subset) =>
		subset.reduce((acc, cur) => ({ ...acc, ...cur }), {})
	);

	// Remove duplicates and return
	return [...new Set(reducedPowerSet)];
}

module.exports = generateCombos;
