import { type UrlObject } from "node:url";
import { type LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

interface NavigationRoute {
  id: string;
  translationKey: keyof Messages["Routes"];
  url: string | UrlObject;
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
      id: "about",
      translationKey: "about",
      url: {
        pathname: "/",
        hash: "#about",
      },
    },
    {
      id: "experience",
      translationKey: "experience",
      url: {
        pathname: "/",
        hash: "#experience",
      },
    },
    {
      id: "projects",
      translationKey: "projects",
      url: {
        pathname: "/",
        hash: "#projects",
      },
    },
    {
      id: "blog",
      translationKey: "blog",
      url: "/blog",
    },
    {
      id: "contact",
      translationKey: "contact",
      url: {
        pathname: "/",
        hash: "#contact",
      },
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
