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
        <CardHeader className="space-x-4">
          <CardTitle className="text-center font-bold">{title}</CardTitle>
          <CardDescription className="text-ellipsis overflow-hidden">
            {trimExcerpt(excerpt)}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between items-end">
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
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogPostPreview;
