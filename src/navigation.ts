import { LOCALIZATION_CONFIG } from "@constants";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: LOCALIZATION_CONFIG.locales,
    localePrefix: LOCALIZATION_CONFIG.localePrefix,
  });
