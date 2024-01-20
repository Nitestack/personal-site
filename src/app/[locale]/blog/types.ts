export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  imgUrl?: string;
  imgAlt?: string;
  createdAtTimestamp: number;
  lastEditedAtTimestamp: number;
}

export type BlogPostPreview = Omit<BlogPost, "">;
