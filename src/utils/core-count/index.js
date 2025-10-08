"use strict";

const { exec: execCallback } = require("node:child_process");
const { cpus, platform } = require("node:os");
const { promisify } = require("node:util");

const exec = promisify(execCallback);
// Ignore stdin and stderr, pipe stdout
const EXEC_OPTS = { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] };

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
			const { stdout } = await exec(
				"sysctl -n hw.physicalcpu_max",
				EXEC_OPTS
			);
			result = Number.parseInt(stdout, 10);
			break;
		}
		case "linux": {
			const { stdout } = await exec(
				'lscpu -p | egrep -v "^#" | sort -u -t, -k 2,4 | wc -l',
				EXEC_OPTS
			);
			result = Number.parseInt(stdout, 10);
			break;
		}
		case "win32": {
			const { stdout } = await exec(
				'powershell -NoProfile -Command "(Get-CimInstance Win32_Processor).NumberOfCores | Measure-Object -Sum | Select-Object -ExpandProperty Sum"',
				EXEC_OPTS
			);
			result = Number.parseInt(stdout, 10);
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
