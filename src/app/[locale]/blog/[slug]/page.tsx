import {
  getBlogPageBySlug,
  getLocaleDateString,
  getNotionPageContent,
  hljsPlugin,
  notionClient,
  parseBlogPageProperties,
  trimExcerpt,
} from "@app/[locale]/blog/notion";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Skeleton } from "@components/ui/skeleton";

import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { type FC, Suspense } from "react";

import { getAvatarFallback } from "@utils";

import { SITE_CONFIG } from "@constants";

import Logo from "@assets/logo.png";

const notionRenderer = new NotionRenderer({
  client: notionClient,
});

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata | undefined> {
  const post = await getBlogPageBySlug(slug);
  if (!post) return;
  const { title, excerpt } = parseBlogPageProperties(post.properties);
  const description = trimExcerpt(excerpt);
  const imageUrl = post.cover
    ? post.cover.type == "external"
      ? post.cover.external.url
      : post.cover.file.url
    : undefined;
  const publishedTime = getLocaleDateString(new Date(post.created_time));
  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    openGraph: {
      authors: [SITE_CONFIG.name],
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/blog/${slug}`,
      publishedTime,
      images: imageUrl ? [{ url: imageUrl, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@nitestack",
      creatorId: "1686490852212838400",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const BlogPage: FC<{ params: { slug: string } }> = ({ params: { slug } }) => {
  const t = useTranslations("Blog");

  return (
    <Suspense>
      <BlogPost
        slug={slug}
        createdAtLabel={t("createdAt")}
        lastEditedLabel={t("lastEdited")}
        authorLabel={t("author")}
      />
    </Suspense>
  );
};

const BlogPost: FC<{
  slug: string;
  createdAtLabel: string;
  lastEditedLabel: string;
  authorLabel: string;
}> = async ({ createdAtLabel, lastEditedLabel, authorLabel, slug }) => {
  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));

  const post = await getBlogPageBySlug(slug);

  if (!post) notFound();

  const { title, excerpt } = parseBlogPageProperties(post.properties);
  const lastEditedDate = getLocaleDateString(new Date(post.last_edited_time));
  const createdDate = getLocaleDateString(new Date(post.created_time));

  return (
    <article className="max-w-3xl mx-auto mt-4 md:mt-8 lg:mt-12 space-y-4 md:space-y-8">
      <section className="space-y-4 md:space-y-8">
        <div className="text-center space-y-4 md:space-y-8 lg:space-y-12">
          <h1 className="text-balance tracking-wide text-3xl sm:text-4xl font-extrabold lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-balance text-sm sm:text-base lg:text-lg font-mono md:italic">
            {excerpt}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
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
          <div className="text-right flex items-start gap-10">
            <div>
              <p className="text-xs md:text-sm font-mono">{createdAtLabel}</p>
              <p className="text-sm md:text-lg font-bold">{createdDate}</p>
            </div>
            {createdDate.toLowerCase() !== lastEditedDate.toLowerCase() && (
              <div className="hidden sm:block">
                <p className="text-xs md:text-sm font-mono">
                  {lastEditedLabel}
                </p>
                <p className="text-sm md:text-lg font-bold">{lastEditedDate}</p>
              </div>
            )}
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
