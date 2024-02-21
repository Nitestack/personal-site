/**
 * @param {string} dirName
 */
function dirAlias(dirName) {
  return `^@${dirName}/(.*)$`;
}

/**
 * @param {string} fileName
 */
function fileAlias(fileName) {
  return `^@${fileName}$`;
}

const thirdPartyModules = "<THIRD_PARTY_MODULES>";

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  // Import sorting
  importOrder: [
    "^server-only$",
    fileAlias("metadata"),
    dirAlias("app"),
    dirAlias("components"),
    fileAlias("hooks"),
    fileAlias("navigation"),
    dirAlias("lib"),
    thirdPartyModules,
    fileAlias("utils"),
    fileAlias("constants"),
    fileAlias("env"),
    dirAlias("public"),
    fileAlias("types"),
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
