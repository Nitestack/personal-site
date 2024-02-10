import { type UrlObject } from "node:url";
import { type LocalePrefix } from "node_modules/next-intl/dist/types/src/shared/types";

interface NavigationRoute {
  id: Section;
  translationKey: keyof Messages["Routes"];
  url: string | UrlObject;
}

export const sections = [
  "intro",
  "about",
  "experience",
  "projects",
  "blog",
  "contact",
] as const;

export type Section = (typeof sections)[number];

export const SITE_CONFIG: {
  firstName: string;
  name: string;
  email: string;
  url: string;
  routes: NavigationRoute[];
} = {
  firstName: "Nhan",
  name: "Nhan Pham",
  email: "nhan.pham@mail.de",
  url:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://nhanpham.vercel.app",
  routes: sections
    .filter((section) => section !== "intro")
    .map<NavigationRoute>((section) => ({
      id: section,
      translationKey: section as keyof Messages["Routes"],
      url: {
        pathname: "/",
        hash: `#${section}`,
      },
    })),
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
