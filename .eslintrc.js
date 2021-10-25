module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	extends: [
		"airbnb-base",
		"plugin:promise/recommended",
		"plugin:jest/recommended",
		"plugin:jsdoc/recommended",
		"plugin:security/recommended",
		"plugin:security-node/recommended",
		"prettier",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	plugins: [
		"import",
		"jest",
		"jsdoc",
		"promise",
		"security",
		"security-node",
	],
	root: true,
	rules: {
		"import/no-extraneous-dependencies": "error",
		"no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
		"prefer-destructuring": "off",
		"promise/prefer-await-to-callbacks": "warn",
		"promise/prefer-await-to-then": "warn",
	},
};
