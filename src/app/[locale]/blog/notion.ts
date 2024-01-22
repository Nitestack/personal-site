import "server-only";

import { type Plugin, createBlockRenderer } from "@notion-render/client";
import { Client } from "@notionhq/client";
import {
  type BlockObjectResponse,
  type CodeBlockObjectResponse,
  type PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import hljs, { type HighlightOptions } from "highlight.js";
import { cache } from "react";

import { env } from "@env";

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

export const parseBlogPageProperties = (
  properties: PageObjectResponse["properties"],
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
  };
};

export const trimExcerpt = (excerpt: string) => {
  return excerpt.length > 200 ? excerpt.slice(0, 200) + "..." : excerpt;
};

export const getLocaleDateString = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });
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
          <div class="bg-muted flex justify-between items-center gap-2 h-full w-full font-bold rounded-t px-6 py-2">
            <legend class="font-mono text-xs truncate">${data.code.caption.length >= 1 ? await renderer.render(...data.code.caption) : "Code"}</legend>
            <div class="flex items-center">
              <button class="hover:text-foreground/50 w-5 h-5" onclick="navigator.clipboard.writeText(\`${clipboardText}\`); this.innerHTML = \`${checkIconSvg}\`; setTimeout(() => { this.innerHTML = \`${copyIconSvg}\`; }, 2000);">
                ${copyIconSvg}
              </button>
            </div>
          </div>
          <pre><code class="language-${data.code.language}">${result.value}</code></pre>
        </div>
    `;
    },
  );

export const hljsPlugin: Plugin<Config> = (options) => ({
  renderers: [codeBlockRenderer(options)],
  extensions: [],
});
