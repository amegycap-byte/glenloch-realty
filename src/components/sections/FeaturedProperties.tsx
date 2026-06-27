"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import PropertyCard from "@/components/shared/PropertyCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { properties } from "@/data/properties";

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-24 relative overflow-hidden bg-warm-white">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                Featured Properties
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">
              Premium Investment<br />
              <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl text-lg">
              Hand-picked properties offering exceptional value across Dubai&apos;s most desirable locations.
            </p>
          </div>
          <Link href="/buy" className="hidden sm:block mt-4 sm:mt-0">
            <Button variant="outline">
              View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/buy">
            <Button variant="outline" size="lg">
              Explore All Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
