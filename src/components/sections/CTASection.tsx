"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  dark?: boolean;
}

export default function CTASection({
  title = "Ready to Start Your Investment Journey?",
  description = "Book a free consultation with our experts and discover the best Dubai real estate opportunities tailored to your goals.",
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact",
  dark = true,
}: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1A33 0%, #0F2548 50%, #1A3366 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex p-4 rounded-3xl bg-accent/10 border border-accent/20 mb-8"
          >
            <CalendarCheck className="w-10 h-10 text-accent" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={primaryHref}>
              <Button variant="primary" size="lg" className="shadow-2xl shadow-accent/20">
                {primaryLabel}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/buy">
              <Button variant="outline" size="lg">
                Browse Properties
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
