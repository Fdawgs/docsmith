/* eslint-disable security/detect-object-injection */

"use strict";

/**
 * @description Bitwise power-set function, adapted from algorithm at
 * https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/power-set/btPowerSet.js
 * @param {*[]} originalSet - Original set of elements we are forming power-set of.
 * @param {*[][]} allSubsets - All subsets that have been formed so far.
 * @param {*[]} currentSubSet - Current subset that we are forming at the moment.
 * @param {number} startAt - The position in original set we are starting to form current subset.
 * @returns {*[][]} All subsets of original set.
 */
function btPowerSetRecursive(
	originalSet,
	allSubsets = [[]],
	currentSubSet = [],
	startAt = 0
) {
	/**
	 * Let's iterate over originalSet elements that may be added to the subset
	 * without having duplicates. The value of startAt prevents adding the duplicates
	 */
	for (let position = startAt; position < originalSet.length; position += 1) {
		// Let's push current element to the subset
		currentSubSet.push(originalSet[position]);

		/**
		 * Current subset is already valid so let's memorize it.
		 * We do array destruction here to save the clone of the currentSubSet.
		 * We need to save a clone since the original currentSubSet is going to be
		 * mutated in further recursive calls
		 */
		allSubsets.push([...currentSubSet]);

		/**
		 * Let's try to generate all other subsets for the current subset.
		 * We're increasing the position by one to avoid duplicates in subset
		 */
		btPowerSetRecursive(
			originalSet,
			allSubsets,
			currentSubSet,
			position + 1
		);

		// BACKTRACK. Exclude last element from the subset and try the next valid one
		currentSubSet.pop();
	}

	// Return all subsets of a set
	return allSubsets;
}

module.exports = btPowerSetRecursive;
