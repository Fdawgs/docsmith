const { name } = require("./package.json");

// PM2 ecosystem config
module.exports = {
	apps: [
		{
			cwd: __dirname,
			exec_mode: "cluster",
			instances: "max",
			name,
			script: "./dist/app.js",
			watch: [".env"],
		},
	],
};
