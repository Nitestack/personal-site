import "server-only";

import { SITE_CONFIG } from "@constants";
import { env } from "@env";
import { createBlockRenderer } from "@notion-render/client";
import { Client } from "@notionhq/client";
import {
  type BlockObjectResponse,
  type CodeBlockObjectResponse,
  type PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import hljs from "highlight.js";
import { cache } from "react";

import type { Plugin } from "@notion-render/client";
import type { HighlightOptions } from "highlight.js";

// Only get pages that are published
const filterByStatus = {
  property: "Status",
  select: {
    equals: "Published",
  },
};

export const notionClient = new Client({
  auth: env.NOTION_SECRET,
});

export const getNotionPageContent = cache(async (pageId: string) => {
  const blockChildren = await notionClient.blocks.children.list({
    block_id: pageId,
  });
  return blockChildren.results as BlockObjectResponse[];
});

export const incrementViewCount = cache(
  async (pageID: string, viewCount: number) => {
    await notionClient.pages.update({
      page_id: pageID,
      properties: {
        Views: {
          number: viewCount + 1,
        },
      },
    });
  }
);

export const getBlogPages = cache(async () => {
  const pages = await notionClient.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: filterByStatus,
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
      {
        property: "Title",
        direction: "ascending",
      },
    ],
  });
  return pages.results as PageObjectResponse[];
});

export const getBlogPageBySlug = cache(async (slug: string) => {
  const pages = await notionClient.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        filterByStatus,
      ],
    },
  });
  return pages.results[0] as PageObjectResponse | undefined;
});

export const getOGImage = (
  cover?: PageObjectResponse["cover"],
  fallbackImageUrl?: {
    title?: string;
    description?: string;
    locale?: string;
    fullUrl?: boolean;
  }
) => {
  let imageUrl =
    cover?.type == "external" ? cover.external.url : cover?.file?.url;
  if (!imageUrl) {
    const searchParams = new URLSearchParams();
    if (fallbackImageUrl?.title)
      searchParams.set("title", fallbackImageUrl.title);
    if (fallbackImageUrl?.description)
      searchParams.set("description", fallbackImageUrl.description);
    if (fallbackImageUrl?.locale)
      searchParams.set("locale", fallbackImageUrl.locale);
    imageUrl = `${fallbackImageUrl?.fullUrl ? SITE_CONFIG.url : ""}/api/og?${searchParams.toString()}`;
  }
  return imageUrl;
};

export const parseBlogPageProperties = (
  properties: PageObjectResponse["properties"]
) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    title: (properties.Title as any).title[0].plain_text as string,
    excerpt:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      ((properties.Excerpt as any).rich_text[0]?.plain_text as
        | string
        | undefined) ?? "",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    slug: (properties.Slug as any).rich_text[0].plain_text as string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    views: ((properties.Views as any).number as number | undefined) ?? 0,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    publishedAt: (properties["Published At"] as any)?.date?.start
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        new Date((properties["Published At"] as any).date.start as string)
      : new Date(),
    tags:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
      ((properties.Tags as any).multi_select.map(
        (tag: { name: string }) => tag.name
      ) as string[] | undefined) ?? [],
  };
};

export const trimExcerpt = (excerpt: string) => {
  return excerpt.length > 200 ? excerpt.slice(0, 200) + "..." : excerpt;
};

type Config = Partial<HighlightOptions>;

const codeBlockRenderer = (options: Config) =>
  createBlockRenderer<CodeBlockObjectResponse>(
    "code",
    async (data, renderer) => {
      const code = await renderer.render(...data.code.rich_text);

      const result = hljs.highlight(code, {
        language: data.code.language,
        ...options,
      });

      const copyIconSvg = `
        <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6px' d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'></path>
        </svg>`;
      const checkIconSvg = `
        <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path>
        </svg>`;

      const clipboardText = code
        .replace(/"/g, "\\&quot;")
        .replace(/`/g, "\\`")
        .replace(/\$\{/g, "\\${");

      return `
        <div class="notion-${data.type}">
          <div class="bg-muted flex justify-between items-center gap-2 h-full w-full font-bold rounded-t px-[calc(16_/_14_*1em)] md:py-2 lg:px-6 py-1">
            <legend class="font-mono text-xs md:text-sm truncate">${data.code.caption.length >= 1 ? await renderer.render(...data.code.caption) : "Code"}</legend>
            <div class="flex items-center">
              <button class="hover:text-foreground/50 w-5 h-5" onclick="navigator.clipboard.writeText(\`${clipboardText}\`); this.innerHTML = \`${checkIconSvg}\`; setTimeout(() => { this.innerHTML = \`${copyIconSvg}\`; }, 2000);">
                ${copyIconSvg}
              </button>
            </div>
          </div>
          <pre><code class="language-${data.code.language}">${result.value}</code></pre>
        </div>
    `;
    }
  );

export const hljsPlugin: Plugin<Config> = (options) => ({
  renderers: [codeBlockRenderer(options)],
  extensions: [],
});
