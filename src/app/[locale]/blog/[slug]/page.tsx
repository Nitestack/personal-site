import {
  getBlogPageBySlug,
  getLocaleDateString,
  getNotionPageContent,
  notionClient,
  parseBlogPageProperties,
  trimExcerpt,
} from "@app/[locale]/blog/notion";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { type FC, Suspense } from "react";

import { getAvatarFallback } from "@utils";

import { SITE_CONFIG } from "@constants";

const notionRenderer = new NotionRenderer({
  client: notionClient,
});

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPageBySlug(slug);
  if (!post) return {};
  const { title, excerpt } = parseBlogPageProperties(post.properties);
  return {
    title: title,
    description: trimExcerpt(excerpt),
  };
}

const BlogPage: FC<{ params: { slug: string } }> = async ({
  params: { slug },
}) => {
  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));

  const post = await getBlogPageBySlug(slug);

  if (!post) notFound();

  const { title, excerpt } = parseBlogPageProperties(post.properties);
  const lastEditedDate = getLocaleDateString(new Date(post.last_edited_time));
  const createdDate = getLocaleDateString(new Date(post.created_time));

  return (
    <article className="max-w-3xl mx-auto">
      <section className="space-y-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold lg:text-5xl">{title}</h1>
          <p className="mt-4 text-lg font-mono">{excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/test" />
              <AvatarFallback>
                {getAvatarFallback(SITE_CONFIG.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-mono">Author</p>
              <p>{SITE_CONFIG.name}</p>
            </div>
          </div>
          <div className="text-right flex items-start gap-10">
            <div>
              <p className="text-xs font-mono">Created at</p>
              <p>{createdDate}</p>
            </div>
            {createdDate.toLowerCase() !== lastEditedDate.toLowerCase() && (
              <div>
                <p className="text-xs font-mono">Last edited</p>
                <p>{lastEditedDate}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Suspense>
        <BlogDescription postID={post.id} />
      </Suspense>
    </article>
  );
};

const BlogDescription: FC<{ postID: string }> = async ({ postID }) => {
  const content = await getNotionPageContent(postID);
  const htmlContent = await notionRenderer.render(...content);

  return (
    <div
      className="max-w-3xl prose prose-neutral dark:prose-invert lg:prose-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
};

export default BlogPage;