import { LOCALIZATION_CONFIG } from "@constants";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: LOCALIZATION_CONFIG.locales,
  defaultLocale: LOCALIZATION_CONFIG.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
