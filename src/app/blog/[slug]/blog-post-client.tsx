"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/shared/BlogCard";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Button>
          </Link>
        </div>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10"
          >
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-gray max-w-none"
          >
            <p className="text-lg text-gray-600 leading-relaxed">{post.content}</p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              For personalized advice on your Dubai property investment journey, contact our expert team.
              We&apos;re here to help you make informed decisions every step of the way.
            </p>
          </motion.div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-sm text-gray-500">
              Written by <span className="font-semibold text-primary">{post.author}</span>
            </p>
            <Link href="/contact">
              <Button size="sm">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="pb-20 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard key={rp.id} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
