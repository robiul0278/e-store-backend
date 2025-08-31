import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: { globals: {
       ...globals.browser, 
       ...globals.node, 
       process: "readonly" // Adding process as a readonly global
      } },
    rules: {
      "no-console": "warn",
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
    extends: ["prettier"],
    ignores: ["node_modules/", "dist/", "build/"], // Place inside the object
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];