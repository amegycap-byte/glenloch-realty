"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">
              Latest <span className="text-gradient">News & Insights</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl text-lg">
              Stay informed with the latest Dubai real estate market trends and investment tips.
            </p>
          </div>
          <Link href="/blog" className="hidden sm:block mt-4 sm:mt-0">
            <Button variant="outline">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10 sm:hidden">
          <Link href="/blog">
            <Button variant="outline">View All Articles <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
