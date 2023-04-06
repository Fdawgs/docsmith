/**
 * @author Julian Matthews
 * @description Validates buffer as PDF.
 * @param {*} buffer - Buffer to validate.
 * @returns {*} Boolean.
 */
function buff(buffer) {
	if (!buffer || buffer.length < 4) {
		return false;
	}
	return (
		buffer[0] === 37 &&
		buffer[1] === 80 &&
		buffer[2] === 68 &&
		buffer[3] === 70
	);
}
/**
 * @description Validates raw input as PDF.
 * @param {*} str - string to validate.
 * @returns {*} Boolean.
 */
function raw(str) {
	if (!str || str.length < 4) {
		return false;
	}
	return str.startsWith("%PDF");
}

module.exports = { buff, raw };
