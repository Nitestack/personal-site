import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { LOCALIZATION_CONFIG } from "@constants";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: LOCALIZATION_CONFIG.locales,
    localePrefix: LOCALIZATION_CONFIG.localePrefix,
  });
