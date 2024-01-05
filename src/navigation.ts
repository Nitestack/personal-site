import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { LOCALES, LOCALE_PREFIX } from "@constants";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: LOCALES,
    localePrefix: LOCALE_PREFIX,
  });
