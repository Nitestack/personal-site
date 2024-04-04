import { classNames } from "@utils";
import NextImage from "next/image";
import { type FC } from "react";
import { TransitionLink } from "src/hooks";

import { getLocaleDateString } from "@app/[locale]/blog/notion";
import SkeletonBlogPreview from "@app/[locale]/blog/skeleton-blog-preview";
import { type BlogPostPreview } from "@app/[locale]/blog/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

const BlogPostPreview: FC<
  BlogPostPreview & {
    viewsLabel: string;
    publishedAtLabel: string;
    locale?: string;
    carouselItem?: boolean;
  }
> = ({
  title,
  excerpt,
  imgAlt,
  imgUrl,
  slug,
  publishedAt,
  publishedAtLabel,
  views,
  viewsLabel,
  locale,
  carouselItem,
}) => {
  const formatter = new Intl.NumberFormat(locale);
  return (
    <TransitionLink
      fallback={<SkeletonBlogPreview />}
      className="group"
      href={`/blog/${slug}`}
    >
      <Card className="flex flex-col overflow-x-hidden">
        <div className="relative aspect-video h-full border-b border-border group-hover:opacity-75">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader
          className={classNames(
            "flex h-full flex-col space-y-6 group-hover:bg-accent",
            carouselItem && "px-2 py-3 sm:px-4 sm:py-5 md:px-6 md:py-7"
          )}
        >
          <div className="flex-1 space-y-4">
            <CardTitle className="text-balance text-center font-bold">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-3 overflow-hidden text-ellipsis text-balance md:text-base">
              {excerpt}
            </CardDescription>
          </div>
          <div className="space-y-1 rounded-md bg-muted p-2 shadow-sm shadow-ring">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs">{viewsLabel}</p>
              <p className="font-mono text-xs">{publishedAtLabel}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">
                {views >= 1e9 ? "1B+" : formatter.format(views)}
              </p>
              <p className="font-bold">
                {carouselItem
                  ? publishedAt.toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : getLocaleDateString(publishedAt, locale)}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </TransitionLink>
  );
};

export default BlogPostPreview;
