import { type LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

export const SITE_CONFIG = {
  name: "Nhan Pham",
  // TODO: Edit in production
  url: "http://localhost:3000",
};

export const LOCALIZATION_CONFIG: {
  locales: string[];
  defaultLocale: string;
  localePrefix: LocalePrefix;
  localeMap: Record<string, string>;
} = {
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  localeMap: {
    en: "English",
    de: "Deutsch",
  },
};
