import BlogPostPreview from "@app/[locale]/blog/blog-preview";
import {
  getBlogPages,
  parseBlogPageProperties,
} from "@app/[locale]/blog/notion";
import SkeletonBlogPreview from "@app/[locale]/blog/skeleton-blog-preview";

import { metadata } from "@metadata";
import { useTranslations } from "next-intl";
import { unstable_noStore } from "next/cache";
import { type FC, Suspense } from "react";

import { SITE_CONFIG } from "@constants";

export const generateMetadata = metadata((t) => ({
  title: "Blog",
  description: t("Blog.description", { author: SITE_CONFIG.name }),
  alternates: {
    canonical: "/blog",
  },
}));

const BlogOverviewPage: FC = () => {
  unstable_noStore();

  const t = useTranslations("Blog");

  return (
    <div className="mt-4 md:mt-8 lg:mt-12 space-y-6 md:space-y-12">
      <section className="text-center">
        <h1 className="tracking-wide text-3xl sm:text-4xl font-extrabold lg:text-5xl">
          Blog
        </h1>
        <p className="mt-2 md:text-lg">
          {t("description", {
            author: SITE_CONFIG.name,
          })}
        </p>
      </section>
      <section className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-5xl">
          <Suspense
            fallback={Array(4)
              .fill(0)
              .map((_, index) => (
                <SkeletonBlogPreview key={index} />
              ))}
          >
            <BlogList
              viewsLabel={t("views")}
              publishedAtLabel={t("publishedAt")}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

const BlogList: FC<{
  publishedAtLabel: string;
  viewsLabel: string;
}> = async ({ publishedAtLabel, viewsLabel }) => {
  const pages = (await getBlogPages()).map((page) => {
    const { title, excerpt, slug, publishedAt, views } =
      parseBlogPageProperties(page.properties);
    return {
      title,
      excerpt,
      slug,
      publishedAt,
      views,
      imgUrl:
        page.cover?.type == "external"
          ? page.cover.external.url
          : page.cover?.file.url,
    };
  });

  return pages.map(({ views, publishedAt, slug, title, excerpt, imgUrl }) => (
    <BlogPostPreview
      key={slug}
      title={title}
      excerpt={excerpt}
      imgAlt={undefined}
      imgUrl={imgUrl}
      slug={slug}
      views={views}
      viewsLabel={viewsLabel}
      publishedAt={publishedAt}
      publishedAtLabel={publishedAtLabel}
    />
  ));
};

export default BlogOverviewPage;
