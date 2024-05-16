"use strict";

/**
 * @description Generates the power set of a given set using a recursive backtracking approach.
 * @param {*[]} originalSet - Original set of elements we are forming power-set of.
 * @param {*[][]} [allSubsets] - All subsets that have been formed so far. Used internally for recursion.
 * @param {*[]} [currentSubSet] - The current subset being formed. Used internally for recursion.
 * @param {number} [startAt] - The position in the original set from which to start forming the current subset.
 * @returns {*[][]} All subsets of original set.
 */
function btPowerSetRecursive(
	originalSet,
	allSubsets = [[]],
	currentSubSet = [],
	startAt = 0
) {
	for (let position = startAt; position < originalSet.length; position += 1) {
		currentSubSet.push(originalSet[position]);
		allSubsets.push([...currentSubSet]);

		btPowerSetRecursive(
			originalSet,
			allSubsets,
			currentSubSet,
			position + 1
		);

		// Backtrack the current subset
		currentSubSet.pop();
	}

	return allSubsets;
}

module.exports = btPowerSetRecursive;
