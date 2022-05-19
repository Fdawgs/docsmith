/**
 * @author Frazer Smith
 * @description Convert string boolean to boolean
 * or string number to number.
 * @param {*} param - String to convert.
 * @returns {*} Parsed string, or original value
 * if unable to parse.
 */
function parseString(param) {
	if (typeof param === "string") {
		const trimmedParam = param.toLowerCase().trim();
		if (trimmedParam === "true") {
			return true;
		}
		if (trimmedParam === "false") {
			return false;
		}
		if (!Number.isNaN(Number(trimmedParam))) {
			return Number(trimmedParam);
		}
	}

	return param;
}

module.exports = parseString;
