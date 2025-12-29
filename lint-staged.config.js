/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{md,json,css,yml,yaml}": "prettier --write",
  "messages/*.json": "pnpm run i18n:check",
};

export default config;
