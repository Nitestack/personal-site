import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import {
  getBlogPageBySlug,
  getNotionPageContent,
  getOGImage,
  hljsPlugin,
  incrementViewCount,
  notionClient,
  parseBlogPageProperties,
  trimExcerpt,
} from "@/app/[locale]/blog/notion";
import { SITE_CONFIG } from "@/constants";
import { env } from "@/env";
import { metadata } from "@/metadata";
import { getAvatarFallback, getLocaleDateString } from "@/utils";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import AvatarPicture from "@public/images/avatar.jpg";
import { getTranslations } from "next-intl/server";
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type BlogPosting, type Thing, type WithContext } from "schema-dts";

import type { FC } from "react";

const notionRenderer = new NotionRenderer({
  client: notionClient,
});

export const generateMetadata = metadata<{ slug: string }>(
  async (_, { params: { slug, locale } }) => {
    const post = await getBlogPageBySlug(slug);
    if (!post) return;
    const { title, excerpt, publishedAt, tags } = parseBlogPageProperties(
      post.properties,
    );
    const description = trimExcerpt(excerpt);
    const imageUrl = getOGImage(post.cover, {
      title,
      description,
      locale,
    });
    return {
      title,
      description,
      openGraph: {
        type: "article",
        url: `/${locale}/blog/${slug}`,
        publishedTime: publishedAt.toISOString(),
        modifiedTime: new Date(post.last_edited_time).toISOString(),
        images: { url: imageUrl, alt: title, width: 1200, height: 630 },
        tags,
      } satisfies OpenGraph & { type: "article" },
      twitter: {
        images: { url: imageUrl, alt: title, width: 1200, height: 630 },
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  },
);

const BlogPage: FC<{
  params: Promise<{ slug: string; locale: string }>;
}> = async ({ params }) => {
  const { slug, locale } = await params;
  const t = await getTranslations("Blog");

  return (
    <Suspense>
      <BlogPost
        slug={slug}
        publishedAtLabel={t("publishedAt")}
        authorLabel={t("author")}
        viewsLabel={t("views")}
        locale={locale}
      />
    </Suspense>
  );
};

function JsonLd<T extends Thing>({ json }: { json: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

const BlogPost: FC<{
  slug: string;
  locale: string;
  publishedAtLabel: string;
  authorLabel: string;
  viewsLabel: string;
}> = async ({ publishedAtLabel, authorLabel, viewsLabel, slug, locale }) => {
  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));

  const post = await getBlogPageBySlug(slug);

  if (!post) notFound();

  const { title, excerpt, views, publishedAt, tags } = parseBlogPageProperties(
    post.properties,
  );

  if (env.NODE_ENV === "production") void incrementViewCount(post.id, views);

  return (
    <article className="mx-auto mt-4 max-w-3xl space-y-4 md:mt-8 md:space-y-8 lg:mt-12">
      <JsonLd<BlogPosting>
        json={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: excerpt,
          author: {
            "@type": "Person",
            name: SITE_CONFIG.name,
          },
          url: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
          keywords: tags,
          datePublished: publishedAt.toISOString(),
          dateModified: new Date(post.last_edited_time).toISOString(),
          image: getOGImage(post.cover),
        }}
      />
      <section className="space-y-4 md:space-y-8">
        <div className="space-y-4 text-center md:space-y-8 lg:space-y-12">
          <h1 className="text-3xl font-extrabold tracking-wide text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-sm text-balance sm:text-base md:italic lg:text-lg">
            {excerpt}
          </p>
        </div>
        <div className="bg-muted shadow-ring flex flex-row items-center justify-between gap-4 rounded-lg p-2 shadow-xs">
          <div className="hidden items-center gap-2 sm:flex">
            <Avatar>
              <AvatarImage src={AvatarPicture.src} alt={SITE_CONFIG.name} />
              <AvatarFallback>
                {getAvatarFallback(SITE_CONFIG.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-mono text-xs md:text-sm">{authorLabel}</p>
              <p className="text-sm font-bold md:text-lg">{SITE_CONFIG.name}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="font-mono text-xs md:text-sm">{publishedAtLabel}</p>
            <p className="text-sm font-bold md:text-lg">
              {getLocaleDateString(publishedAt, locale)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-mono text-xs md:text-sm">{viewsLabel}</p>
            <p className="font-mono text-sm font-bold md:text-base">
              {views >= 1e9 ? "1B+" : new Intl.NumberFormat().format(views + 1)}
            </p>
          </div>
        </div>
      </section>
      <Suspense fallback={<SkeletonBlogDescription />}>
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
      className="notion-render prose prose-orange dark:prose-invert lg:prose-lg prose-code:break-words prose-pre:relative prose-pre:mt-0 prose-pre:rounded-b-md prose-pre:rounded-t-none md:prose-code:break-normal max-w-3xl"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

const SkeletonBlogDescription: FC = () => {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <Skeleton className="h-4 w-full lg:h-5" />
        <Skeleton className="h-4 w-5/6 lg:h-5" />
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-9/12 lg:h-5" />
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-8/12 lg:h-5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full lg:h-5" />
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-9/12 lg:h-5" />
        <Skeleton className="h-4 w-5/6 lg:h-5" />
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-7/12 lg:h-5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-9/12 lg:h-5" />
        <Skeleton className="h-4 w-full lg:h-5" />
        <Skeleton className="h-4 w-11/12 lg:h-5" />
        <Skeleton className="h-4 w-5/6 lg:h-5" />
        <Skeleton className="h-4 w-7/12 lg:h-5" />
      </div>
    </div>
  );
};

export default BlogPage;
