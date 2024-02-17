import { getLocaleDateString } from "@app/[locale]/blog/notion";
import { type BlogPostPreview } from "@app/[locale]/blog/types";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import { Link } from "@navigation";

import NextImage from "next/image";
import { type FC } from "react";

import { classNames } from "@utils";

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
    <Link className="group snap-center" href={`/blog/${slug}`}>
      <Card className="overflow-hidden flex flex-col">
        <div className="aspect-video h-full relative group-hover:opacity-75">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader
          className={classNames(
            "flex flex-col h-full space-y-6 group-hover:bg-accent",
            carouselItem && "px-2 py-3 sm:px-4 sm:py-5 md:px-6 md:py-7",
          )}
        >
          <div className="flex-1 space-y-4">
            <CardTitle className="text-center text-balance font-bold">
              {title}
            </CardTitle>
            <CardDescription className="md:text-base text-ellipsis text-balance overflow-hidden line-clamp-3">
              {excerpt}
            </CardDescription>
          </div>
          <div className="bg-muted shadow-ring shadow-sm rounded-md p-2 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono">{viewsLabel}</p>
              <p className="text-xs font-mono">{publishedAtLabel}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">
                {views >= 1e9 ? "1B+" : formatter.format(905435423)}
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
    </Link>
  );
};

export default BlogPostPreview;
