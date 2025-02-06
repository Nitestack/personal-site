/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@next/next/core-web-vitals",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      {
        ignoreConditionalTests: true,
      },
    ],
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "array",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "prefer-const": "error",
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    // "no-restricted-imports": [
    //   "error",
    //   {
    //     name: "next/link",
    //     message: "Please import from `@/i18n/routing` instead.",
    //   },
    //   {
    //     name: "next/navigation",
    //     importNames: [
    //       "redirect",
    //       "permanentRedirect",
    //       "useRouter",
    //       "usePathname",
    //     ],
    //     message: "Please import from `@/i18n/routing` instead.",
    //   },
    // ],
  },
};

module.exports = config;
