"use strict";

const esbuild = require("esbuild");

esbuild.build({
	entryPoints: ["src/**"],
	format: "cjs",
	loader: {
		".html": "copy",
		".ico": "copy",
		".png": "copy",
		".svg": "copy",
	},
	logLevel: "info",
	minify: true,
	outdir: "dist",
	packages: "external",
	platform: "node",
	target: "node20",
});
