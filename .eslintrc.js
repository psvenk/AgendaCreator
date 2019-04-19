module.exports = {
	"extends": ["plugin:compat/recommended"],
	"parser": "@typescript-eslint/parser",
	"env": {
		"browser": true
	},
	"settings": {
		"polyfills": [
			"Blob",
			"FileReader"
			/* People on old browsers can use the textarea, I don't think it's
			 * worth it to have a Flash polyfill for FileReader
			 */
		]
	}
}
