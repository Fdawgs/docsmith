"use strict";

module.exports = {
	// Move snapshots next to test file
	resolveSnapshotPath: (testPath, snapshotExtension) =>
		testPath.replace(/\.test\.([jt]sx?)/u, `.test.$1${snapshotExtension}`),
	resolveTestPath: (snapshotFilePath, snapshotExtension) =>
		snapshotFilePath.replace(snapshotExtension, ""),
	testPathForConsistencyCheck: "src/server.test.js",
};
