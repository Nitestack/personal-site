const THIRD_PARTY_MODULES = "<THIRD_PARTY_MODULES>"; // Imports not matched by other special words or groups
const BUILTIN_MODULES = "<BUILTIN_MODULES>"; // Node.js built-in modules
const IMPORT_ALIAS = "^~/.*$";
const TYPES = {
  NODE: "<TYPES>^(node:)", // Types from Node.js built-in modules
  THIRD_PARTY: "<TYPES>", // Types from third party modules
  RELATIVE: "<TYPES>^[.]", // Types from relative imports
};

/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^@/components/ui/.*$",
    "",
    BUILTIN_MODULES,
    "",
    THIRD_PARTY_MODULES,
    "",
    IMPORT_ALIAS,
    "",
    TYPES.NODE,
    TYPES.THIRD_PARTY,
    TYPES.RELATIVE,
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderTypeScriptVersion: "5.9.3",
};

export default config;
