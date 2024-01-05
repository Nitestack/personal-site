import { LOCALES, LOCALE_PREFIX } from "@constants";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: LOCALE_PREFIX,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/(de|en)/:path*"],
};
