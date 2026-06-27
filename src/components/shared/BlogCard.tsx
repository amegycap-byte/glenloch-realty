"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/utils";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 perspective-1000"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <span className="absolute top-4 left-4 bg-gradient-to-r from-accent to-accent-dark text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          {post.category}
        </span>

        <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
        </div>
        <h3 className="font-bold text-primary text-base mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300 leading-snug">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
}
