"use strict";

const { exec: execCallback } = require("node:child_process");
const { cpus, EOL, platform } = require("node:os");
const { promisify } = require("node:util");

const exec = promisify(execCallback);
// Ignore stdin and stderr, pipe stdout
const config = { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] };

/**
 * @author Frazer Smith
 * @description Counts the number of physical CPU cores
 * a system has, taking into account Intel Hyper-Threading.
 *
 * Physical core count is useful for determining the number of
 * workers to spawn for CPU-bound tasks such as image processing.
 * @see {@link https://github.com/nodejs/node/issues/7730 | Node.js Issue #7730}
 * @returns {Promise<number>} Number of physical cores the system has.
 */
async function coreCount() {
	let result = 0;

	switch (platform()) {
		case "darwin": {
			const output = await exec("sysctl -n hw.physicalcpu_max", config);
			result = Number.parseInt(output.stdout, 10);
			break;
		}
		case "linux": {
			const output = await exec(
				'lscpu -p | egrep -v "^#" | sort -u -t, -k 2,4 | wc -l',
				config
			);
			result = Number.parseInt(output.stdout, 10);
			break;
		}
		case "win32": {
			const output = await exec("WMIC CPU Get NumberOfCores", config);
			result = output.stdout
				.split(EOL)
				.map((line) => Number.parseInt(line, 10))
				.filter((value) => !Number.isNaN(Number(value)))
				.reduce((sum, number) => sum + number, 0);
			break;
		}
		default: {
			break;
		}
	}

	return result > 0
		? result
		: cpus().filter(({ model }, index) => {
				const hasHyperthreading = model.includes("Intel");
				return !hasHyperthreading || index % 2 === 1;
			}).length;
}

module.exports = coreCount;
