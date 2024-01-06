import createMiddleware from "next-intl/middleware";

import { LOCALIZATION_CONFIG } from "@constants";

export default createMiddleware({
  locales: LOCALIZATION_CONFIG.locales,
  defaultLocale: LOCALIZATION_CONFIG.defaultLocale,
  localePrefix: LOCALIZATION_CONFIG.localePrefix,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(de|en)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)",
  ],
};
