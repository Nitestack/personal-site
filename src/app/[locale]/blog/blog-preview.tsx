import { getLocaleDateString, trimExcerpt } from "@app/[locale]/blog/notion";
import { type BlogPostPreview } from "@app/[locale]/blog/types";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import { Link } from "@navigation";

import NextImage from "next/image";
import { type FC } from "react";

import PlaceholderImage from "@assets/16_9_placeholder.png";

const BlogPostPreview: FC<
  BlogPostPreview & { createdAtLabel: string; lastEditedLabel: string }
> = ({
  title,
  excerpt,
  createdAtTimestamp,
  lastEditedAtTimestamp,
  imgAlt,
  imgUrl,
  slug,
  createdAtLabel,
  lastEditedLabel,
}) => {
  const createdDate = getLocaleDateString(new Date(createdAtTimestamp));
  const lastEditedDate = getLocaleDateString(new Date(lastEditedAtTimestamp));
  return (
    <Link className="group" href={`/blog/${slug}`}>
      <Card className="overflow-hidden flex flex-col h-full w-full">
        <div className="aspect-video h-full relative">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl ?? PlaceholderImage.src}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader className="flex flex-col h-full space-y-6">
          <div className="flex-1 space-y-4">
            <CardTitle className="text-center font-bold">{title}</CardTitle>
            <CardDescription className="text-ellipsis overflow-hidden">
              {trimExcerpt(excerpt)}
            </CardDescription>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-left">
              {createdDate.toLowerCase() !== lastEditedDate.toLowerCase() && (
                <>
                  <p className="text-xs font-mono">{lastEditedLabel}</p>
                  <p>{lastEditedDate}</p>
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs font-mono">{createdAtLabel}</p>
              <p>{createdDate}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BlogPostPreview;
