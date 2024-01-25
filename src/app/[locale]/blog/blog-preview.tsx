import { getLocaleDateString, trimExcerpt } from "@app/[locale]/blog/notion";
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

const BlogPostPreview: FC<
  BlogPostPreview & { viewsLabel: string; publishedAtLabel: string }
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
}) => {
  return (
    <Link className="group" href={`/blog/${slug}`}>
      <Card className="overflow-hidden flex flex-col h-full w-full shadow-sm shadow-ring">
        <div className="aspect-video h-full relative">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader className="flex flex-col h-full space-y-6">
          <div className="flex-1 space-y-4">
            <CardTitle className="text-center text-balance font-bold">
              {title}
            </CardTitle>
            <CardDescription className="text-ellipsis text-balance overflow-hidden line-clamp-3">
              {trimExcerpt(excerpt)}
            </CardDescription>
          </div>
          <div className="bg-muted shadow-ring shadow-sm rounded-md p-2 flex items-center justify-between">
            <div className="flex flex-col items-start">
              <p className="text-xs font-mono">{viewsLabel}</p>
              <p className="font-mono font-bold">
                {views >= 1e9 ? "1B+" : new Intl.NumberFormat().format(views)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono">{publishedAtLabel}</p>
              <p className="font-bold">{getLocaleDateString(publishedAt)}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BlogPostPreview;
