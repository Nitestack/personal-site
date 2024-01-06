import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { LOCALIZATION_CONFIG } from "@constants";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALIZATION_CONFIG.locales.includes(locale)) notFound();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
