import { trimExcerpt } from "@app/[locale]/blog/notion";
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

import PlaceholderImage from "@assets/16_9_placeholder.png";

const BlogPostPreview: FC<BlogPostPreview> = ({
  title,
  excerpt,
  createdAtTimestamp,
  lastEditedAtTimestamp,
  imgAlt,
  imgUrl,
  slug,
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden">
        <div className="aspect-video h-full relative">
          <NextImage
            className="object-cover"
            fill
            src={imgUrl ?? PlaceholderImage.src}
            alt={imgAlt ?? title}
          />
        </div>
        <CardHeader className="space-y-4">
          <CardTitle className="text-center font-bold">{title}</CardTitle>
          <CardDescription className="text-ellipsis overflow-hidden">
            {trimExcerpt(excerpt)}
          </CardDescription>
          <div className="flex items-start justify-between">
            <div className="text-left">
              <p className="text-xs font-mono">Created at</p>
              <p>
                {new Date(createdAtTimestamp).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono">Last edited</p>
              <p>
                {new Date(lastEditedAtTimestamp).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BlogPostPreview;
