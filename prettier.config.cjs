const tsConfig = require("./tsconfig.json");

const THIRD_PARTY_MODULES = "<THIRD_PARTY_MODULES>"; // Imports not matched by other special words or groups
const BUILTIN_MODULES = "<BUILTIN_MODULES>"; // Node.js built-in modules
const RELATIVE_IMPORTS = "^[.]"; // Relative imports
const TYPES = {
  NODE: "<TYPES>^(node:)", // Types from Node.js built-in modules
  THIRD_PARTY: "<TYPES>", // Types from third party modules
  RELATIVE: "<TYPES>^[.]", // Types from relative imports
};

/** @type {string[]} */
const ALIASES = Object.keys(tsConfig.compilerOptions?.paths ?? {}).map((path) =>
  path.replace(/\*\//g, "")
); // Specify import aliases

/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig & import("prettier-plugin-tailwindcss").PluginOptions} */
module.exports = {
  trailingComma: "es5",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // INFO: To group imports into "chunks" with blank lines between, add empty strings
  importOrder: [
    "",
    BUILTIN_MODULES,
    "",
    THIRD_PARTY_MODULES,
    "",
    `^(${ALIASES.join("|")})(/.*)$`,
    RELATIVE_IMPORTS,
    "",
    TYPES.NODE,
    TYPES.THIRD_PARTY,
    TYPES.RELATIVE,
  ],
  importOrderTypeScriptVersion: "5.8.2",
};
