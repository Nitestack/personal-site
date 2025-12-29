import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NextImage from "next/image";
import { type FC } from "react";

import SkeletonBlogPreview from "@/app/[locale]/blog/skeleton-blog-preview";
import { type BlogPostPreview } from "@/app/[locale]/blog/types";
import { TransitionLink } from "@/hooks";
import { cn, getLocaleDateString } from "@/utils";

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
        <div className="border-border relative aspect-video h-full border-b group-hover:opacity-75">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader
          className={cn(
            "group-hover:bg-accent flex h-full flex-col space-y-6",
            carouselItem && "px-2 py-3 sm:px-4 sm:py-5 md:px-6 md:py-7",
          )}
        >
          <div className="flex-1 space-y-4">
            <CardTitle className="text-center font-bold text-balance">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-3 overflow-hidden text-balance text-ellipsis md:text-base">
              {excerpt}
            </CardDescription>
          </div>
          <div className="bg-muted shadow-ring space-y-1 rounded-md p-2 shadow-xs">
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
