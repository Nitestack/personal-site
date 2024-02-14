import {
  getBlogPages,
  parseBlogPageProperties,
} from "@app/[locale]/blog/notion";

import { LOCALIZATION_CONFIG, SITE_CONFIG } from "@constants";

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#returns
 */
type Sitemap = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}[];

export default async function sitemap() {
  const routes: Sitemap = [];

  const pages = ["", "/blog"];

  for (const page of pages) {
    routes.push(
      ...LOCALIZATION_CONFIG.locales.map((locale) => ({
        url: `${SITE_CONFIG.url}/${locale}${page}`,
        lastModified: new Date().toISOString().split("T")[0],
      })),
    );
  }

  try {
    const pages = await getBlogPages();
    for (const page of pages) {
      const { slug } = parseBlogPageProperties(page.properties);
      routes.push(
        ...LOCALIZATION_CONFIG.locales.map((locale) => ({
          url: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
          lastModified: page.last_edited_time,
        })),
      );
    }
  } catch (err) {
    console.error(err);
  }

  return routes;
}
