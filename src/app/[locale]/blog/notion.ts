import { Client } from "@notionhq/client";
import {
  type BlockObjectResponse,
  type PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

import { env } from "@env";

export const notionClient = new Client({
  auth: env.NOTION_SECRET,
});

export const getNotionPageContent = cache(async (pageId: string) => {
  const blockChildren = await notionClient.blocks.children.list({
    block_id: pageId,
  });
  return blockChildren.results as BlockObjectResponse[];
});

export const getBlogPages = cache(async () => {
  const pages = await notionClient.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });
  return pages.results as PageObjectResponse[];
});

export const getBlogPageBySlug = cache(async (slug: string) => {
  const pages = await notionClient.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return pages.results[0] as PageObjectResponse | undefined;
});

export const parseBlogPageProperties = (
  properties: PageObjectResponse["properties"],
) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    title: (properties.Title as any).title[0].plain_text as string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    excerpt: (properties.Excerpt as any).rich_text[0].plain_text as string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    slug: (properties.Slug as any).rich_text[0].plain_text as string,
  };
};

export const trimExcerpt = (excerpt: string) => {
  return excerpt.length > 200 ? excerpt.slice(0, 200) + "..." : excerpt;
};
