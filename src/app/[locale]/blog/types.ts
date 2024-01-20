export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  dateTimestamp: number;
  imgUrl: string;
  imgAlt: string;
}

export type BlogPostPreview = Omit<BlogPost, "">;
