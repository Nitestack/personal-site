import { type BlogPostPreview } from "@app/[locale]/blog/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import { Link } from "@navigation";

import NextImage from "next/image";
import { type FC } from "react";

const BlogPostPreview: FC<BlogPostPreview> = ({
  title,
  excerpt,
  dateTimestamp,
  imgAlt,
  imgUrl,
  slug,
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="shadow">
        <CardContent>
          <NextImage
            className="w-full h-64 object-cover"
            src={imgUrl}
            alt={imgAlt}
            height="200"
            width="400"
            style={{
              aspectRatio: "400/200",
              objectFit: "cover",
            }}
          />
        </CardContent>
        <CardHeader>
          <div className="flex items-end justify-between">
            <CardTitle>{title}</CardTitle>
            <span>
              {new Date(dateTimestamp).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </span>
          </div>
          <CardDescription>{excerpt}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default BlogPostPreview;
