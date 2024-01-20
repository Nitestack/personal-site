import BlogPostPreview from "@app/[locale]/blog/blog-preview";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { type FC } from "react";

import { SITE_CONFIG } from "@constants";

const BlogOverviewPage: FC<{ params: { locale: string } }> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Blog");

  return (
    <div className="space-y-6">
      <section className="px-6 py-12 text-center">
        <h1 className="text-6xl font-bold">Blog</h1>
        <p className="mt-2 text-lg">
          {t("description", {
            author: SITE_CONFIG.name,
          })}
        </p>
      </section>
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("latestPosts")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <BlogPostPreview
              dateTimestamp={new Date().getTime()}
              key={`post-${i}`}
              title={`Post ${i}`}
              excerpt="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              imgAlt={`Post ${i}`}
              imgUrl="/favicon.ico"
              slug={`post-${i}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogOverviewPage;
