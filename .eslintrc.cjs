module.exports = {
	env: { browser: true, es2020: true, node: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	plugins: ["react-refresh"],
	rules: {
		"prettier/prettier": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"no-warning-comments": [
			"warn",
			{
				terms: ["todo"],
				location: "anywhere",
			},
		],
	},
};
