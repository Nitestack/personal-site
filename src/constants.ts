import { type LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

interface NavigationRoute {
  translationKey: keyof Messages["Routes"];
  href: string;
}

export const SITE_CONFIG: {
  name: string;
  url: string;
  routes: NavigationRoute[];
} = {
  name: "Nhan Pham",
  // TODO: Edit in production
  url: "http://localhost:3000",
  routes: [
    {
      translationKey: "about",
      href: "#about",
    },
    {
      translationKey: "experience",
      href: "#experience",
    },
    {
      translationKey: "projects",
      href: "#projects",
    },
    {
      translationKey: "blog",
      href: "/blog",
    },
    {
      translationKey: "contact",
      href: "#contact",
    },
  ],
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
