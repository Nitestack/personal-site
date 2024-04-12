import { SITE_CONFIG } from "@constants";
import { metadata } from "@metadata";
import { useTranslations } from "next-intl";
import { unstable_noStore } from "next/cache";
import { Fragment, Suspense } from "react";

import BlogPostPreview from "@app/[locale]/blog/blog-preview";
import {
  getBlogPages,
  getOGImage,
  parseBlogPageProperties,
  trimExcerpt,
} from "@app/[locale]/blog/notion";
import SkeletonBlogPreview from "@app/[locale]/blog/skeleton-blog-preview";
import Layout from "@components/layout";
import { CarouselItem } from "@components/ui/carousel";

import type { FC } from "react";

export const generateMetadata = metadata((t, { params: { locale } }) => {
  const title = "Blog";
  const description = t("Blog.description", { author: SITE_CONFIG.name });

  const imageUrl = getOGImage(undefined, {
    title,
    description,
    locale,
  });

  return {
    title,
    description,
    openGraph: {
      images: imageUrl,
    },
    twitter: {
      images: imageUrl,
    },
    alternates: {
      canonical: "/blog",
    },
  };
});

const BlogOverviewPage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_noStore();

  const t = useTranslations("Blog");

  return (
    <Layout
      title="Blog"
      description={t("description", {
        author: SITE_CONFIG.name,
      })}
    >
      <BlogList locale={locale} />
    </Layout>
  );
};

export const BlogList: FC<{ locale: string; showcase?: boolean }> = ({
  locale,
  showcase,
}) => {
  const t = useTranslations("Blog");

  if (showcase)
    return (
      <Suspense
        fallback={Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonBlogPreview key={index} />
          ))}
      >
        <BlogListItems
          viewsLabel={t("views")}
          publishedAtLabel={t("publishedAt")}
          locale={locale}
          carousel
        />
      </Suspense>
    );
  else
    return (
      <section className="flex items-center justify-center">
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
          <Suspense
            fallback={Array(4)
              .fill(0)
              .map((_, index) => (
                <SkeletonBlogPreview key={index} />
              ))}
          >
            <BlogListItems
              viewsLabel={t("views")}
              publishedAtLabel={t("publishedAt")}
              locale={locale}
            />
          </Suspense>
        </div>
      </section>
    );
};

const BlogListItems: FC<{
  publishedAtLabel: string;
  viewsLabel: string;
  locale: string;
  carousel?: boolean;
}> = async ({ publishedAtLabel, viewsLabel, locale, carousel }) => {
  const pages = (await getBlogPages()).map((page) => {
    const { title, excerpt, slug, publishedAt, views } =
      parseBlogPageProperties(page.properties);
    return {
      title,
      excerpt,
      slug,
      publishedAt,
      views,
      imgUrl: getOGImage(page.cover, {
        title,
        description: trimExcerpt(excerpt),
        locale,
        fullUrl: true,
      }),
    };
  });

  const Comp = carousel ? CarouselItem : Fragment;

  return pages.map(({ views, publishedAt, slug, title, excerpt, imgUrl }) => (
    <Comp key={slug} className="md:basis-1/2">
      <BlogPostPreview
        title={title}
        excerpt={excerpt}
        imgAlt={undefined}
        imgUrl={imgUrl}
        slug={slug}
        views={views}
        viewsLabel={viewsLabel}
        publishedAt={publishedAt}
        publishedAtLabel={publishedAtLabel}
        carouselItem={carousel}
      />
    </Comp>
  ));
};

export default BlogOverviewPage;
