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
    dirAlias("app"),
    dirAlias("components"),
    dirAlias("lib"),
    thirdPartyModules,
    fileAlias("utils"),
    dirAlias("constants"),
    fileAlias("env"),
    dirAlias("assets"),
    fileAlias("types"),
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
