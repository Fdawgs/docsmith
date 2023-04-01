const { cpus, EOL, platform } = require("os");
const { execSync } = require("child_process");

/**
 * @author Frazer Smith
 * @description Count number of physical CPU cores a system has,
 * taking into account Intel Hyper-Threading.
 * @see https://github.com/nodejs/node/issues/7730
 * @returns {number} Number of physical cores the system has.
 */
function coreCount() {
	const config = { encoding: "utf8" };

	switch (platform()) {
		case "darwin":
			return parseInt(
				execSync("sysctl -n hw.physicalcpu_max", config).trim(),
				10
			);
		case "linux":
			return parseInt(
				execSync(
					'lscpu -p | egrep -v "^#" | sort -u -t, -k 2,4 | wc -l',
					config
				).trim(),
				10
			);
		case "win32":
			return execSync("WMIC CPU Get NumberOfCores", config)
				.split(EOL)
				.map((line) => parseInt(line, 10))
				.filter((value) => !Number.isNaN(Number(value)))
				.reduce((sum, number) => sum + number, 0);
		default:
			return cpus().filter((cpu, index) => {
				const hasHyperthreading = cpu.model.includes("Intel");
				const isOdd = index % 2 === 1;
				return !hasHyperthreading || isOdd;
			}).length;
	}
}

module.exports = coreCount;
