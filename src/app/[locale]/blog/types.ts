export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  imgUrl?: string;
  imgAlt: string;
  publishedAt: Date;
  views: number;
}

export type BlogPostPreview = Omit<BlogPost, "imgAlt"> & { imgAlt?: string };
