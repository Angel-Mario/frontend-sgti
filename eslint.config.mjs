import withNuxt from "./.nuxt/eslint.config.mjs";
import oxlint from "eslint-plugin-oxlint";

export default withNuxt(
	// your custom flat configs go here, for example:

	...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
);
