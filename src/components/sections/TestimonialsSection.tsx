"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote, Sparkles } from "lucide-react";
import { testimonials } from "@/data/properties";

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-warm-white to-white border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-accent/10 group-hover:text-accent/20 transition-colors" />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-7 relative z-10">&ldquo;{t.content}&rdquo;</p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={52}
                    height={52}
                    className="rounded-full object-cover ring-2 ring-accent/20"
                  />
                </div>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
