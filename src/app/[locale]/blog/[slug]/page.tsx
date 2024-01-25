import { metadata } from "@metadata";

import {
  getBlogPageBySlug,
  getLocaleDateString,
  getNotionPageContent,
  getOGImage,
  hljsPlugin,
  incrementViewCount,
  notionClient,
  parseBlogPageProperties,
  trimExcerpt,
} from "@app/[locale]/blog/notion";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Skeleton } from "@components/ui/skeleton";

import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import Logo from "@public/images/logo.png";
import { useTranslations } from "next-intl";
import { type OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { notFound } from "next/navigation";
import { type FC, Suspense } from "react";
import { type BlogPosting, type Thing, type WithContext } from "schema-dts";

import { getAvatarFallback } from "@utils";

import { SITE_CONFIG } from "@constants";

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

const BlogPage: FC<{ params: { slug: string; locale: string } }> = ({
  params: { slug, locale },
}) => {
  const t = useTranslations("Blog");

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

  void incrementViewCount(post.id, views);

  return (
    <article className="max-w-3xl mx-auto mt-4 md:mt-8 lg:mt-12 space-y-4 md:space-y-8">
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
        <div className="text-center space-y-4 md:space-y-8 lg:space-y-12">
          <h1 className="text-balance tracking-wide text-3xl sm:text-4xl font-extrabold lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-balance text-sm sm:text-base lg:text-lg font-mono md:italic">
            {excerpt}
          </p>
        </div>
        <div className="bg-muted shadow-sm shadow-ring p-2 rounded-lg flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={Logo.src} alt={SITE_CONFIG.name} />
              <AvatarFallback>
                {getAvatarFallback(SITE_CONFIG.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs md:text-sm font-mono">{authorLabel}</p>
              <p className="text-sm md:text-lg font-bold">{SITE_CONFIG.name}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm font-mono">{publishedAtLabel}</p>
            <p className="text-sm md:text-lg font-bold">
              {getLocaleDateString(publishedAt)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs md:text-sm font-mono">{viewsLabel}</p>
            <p className="text-sm md:text-base font-mono font-bold">
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
      className="notion-render max-w-3xl prose prose-code:break-words prose-pre:rounded-t-none md:prose-code:break-normal prose-pre:rounded-b-md prose-pre:mt-0 prose-pre:relative prose-orange dark:prose-invert lg:prose-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

const SkeletonBlogDescription: FC = () => {
  return (
    <div className="max-w-3xl space-y-10">
      <div className="space-y-4">
        <Skeleton className="h-4 lg:h-5 w-full" />
        <Skeleton className="h-4 lg:h-5 w-5/6" />
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-9/12" />
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-8/12" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 lg:h-5 w-full" />
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-9/12" />
        <Skeleton className="h-4 lg:h-5 w-5/6" />
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-7/12" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-9/12" />
        <Skeleton className="h-4 lg:h-5 w-full" />
        <Skeleton className="h-4 lg:h-5 w-11/12" />
        <Skeleton className="h-4 lg:h-5 w-5/6" />
        <Skeleton className="h-4 lg:h-5 w-7/12" />
      </div>
    </div>
  );
};

export default BlogPage;
