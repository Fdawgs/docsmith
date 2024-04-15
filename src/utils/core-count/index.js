"use strict";

const { execSync } = require("node:child_process");
const { cpus, EOL, platform } = require("node:os");

// Ignore stdin and stderr, pipe stdout
const config = { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] };

/**
 * @author Frazer Smith
 * @description Count number of physical CPU cores a system has,
 * taking into account Intel Hyper-Threading.
 * @see {@link https://github.com/nodejs/node/issues/7730 | Node.js Issue #7730}
 * @returns {number} Number of physical cores the system has.
 */
function coreCount() {
	let result = 0;

	switch (platform()) {
		case "darwin":
			result = Number.parseInt(
				execSync("sysctl -n hw.physicalcpu_max", config),
				10
			);
			break;
		case "linux":
			result = Number.parseInt(
				execSync(
					'lscpu -p | egrep -v "^#" | sort -u -t, -k 2,4 | wc -l',
					config
				),
				10
			);
			break;
		case "win32":
			result = execSync("WMIC CPU Get NumberOfCores", config)
				.split(EOL)
				.map((line) => Number.parseInt(line, 10))
				.filter((value) => !Number.isNaN(Number(value)))
				.reduce((sum, number) => sum + number, 0);
			break;
		default:
			break;
	}

	return result > 0
		? result
		: cpus().filter(({ model }, index) => {
				const hasHyperthreading = model.includes("Intel");
				return !hasHyperthreading || index % 2 === 1;
			}).length;
}

module.exports = coreCount;
