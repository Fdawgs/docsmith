"use strict";

const esbuild = require("esbuild");
const { globPlugin } = require("esbuild-plugin-glob");

esbuild.build({
	entryPoints: ["src/**/!(*.test).*"],
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
	plugins: [globPlugin()],
	target: "node18",
});
