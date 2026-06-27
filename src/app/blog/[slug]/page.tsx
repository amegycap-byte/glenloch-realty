import { blogPosts } from "@/data/blog";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
