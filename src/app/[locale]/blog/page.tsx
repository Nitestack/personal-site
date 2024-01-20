import BlogPostPreview from "@app/[locale]/blog/blog-preview";
import {
  getBlogPages,
  parseBlogPageProperties,
} from "@app/[locale]/blog/notion";
import SkeletonBlogPreview from "@app/[locale]/blog/skeleton-blog-preview";

import { type Metadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { type FC, Suspense } from "react";

import { SITE_CONFIG } from "@constants";

export const metadata: Metadata = {
  title: "Blog",
};

const BlogOverviewPage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Blog");

  return (
    <div className="space-y-6">
      <section className="px-6 py-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold">Blog</h1>
        <p className="mt-2 text-lg">
          {t("description", {
            author: SITE_CONFIG.name,
          })}
        </p>
      </section>
      <section className="px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Suspense
            fallback={Array(4)
              .fill(0)
              .map((_, index) => (
                <SkeletonBlogPreview key={index} />
              ))}
          >
            <BlogList />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

const BlogList: FC = async () => {
  const pages = (await getBlogPages()).map((page) => {
    const { title, excerpt, slug } = parseBlogPageProperties(page.properties);
    return {
      title,
      excerpt,
      slug,
      imgUrl:
        page.cover?.type == "external"
          ? page.cover.external.url
          : page.cover?.file.url,
      createdAtTimestamp: new Date(page.created_time).getTime(),
      lastEditedAtTimestamp: new Date(page.last_edited_time).getTime(),
    };
  });

  return pages.map(
    ({
      slug,
      title,
      excerpt,
      imgUrl,
      createdAtTimestamp,
      lastEditedAtTimestamp,
    }) => (
      <BlogPostPreview
        key={slug}
        title={title}
        excerpt={excerpt}
        imgAlt={undefined}
        imgUrl={imgUrl}
        slug={slug}
        createdAtTimestamp={createdAtTimestamp}
        lastEditedAtTimestamp={lastEditedAtTimestamp}
      />
    ),
  );
};

export default BlogOverviewPage;
