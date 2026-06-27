"use client";

import { motion } from "framer-motion";
import { Building2, Home, Percent, Users, ArrowRight, Sparkles, ShieldCheck, ClipboardCheck, Camera, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const stats = [
  { icon: Building2, value: "AED 2.5B+", label: "Properties Sold" },
  { icon: Home, value: "500+", label: "Properties Listed" },
  { icon: Percent, value: "98%", label: "Client Satisfaction" },
  { icon: Users, value: "50K+", label: "Buyer Network" },
];

const features = [
  { icon: ShieldCheck, text: "Free property valuation" },
  { icon: Camera, text: "Professional photography & virtual tours" },
  { icon: ClipboardCheck, text: "Hassle-free paperwork & legal" },
  { icon: DollarSign, text: "Best price guaranteed" },
];

export default function ListPropertySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0B1A33 0%, #0F2548 50%, #1A3366 100%)" }} />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10" style={{ background: "linear-gradient(160deg, #142D4E 0%, #0D1F3C 100%)" }}>
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />

              <div className="p-8 sm:p-12 relative">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                      <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative property icon */}
                <div className="mt-8 flex items-center justify-center gap-3 text-gray-500 text-sm border-t border-white/10 pt-6">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>Trusted by 1,000+ property owners in Dubai</span>
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">For Property Owners</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              List Your Property <br />
              <span className="text-gradient">With Confidence</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Sell or rent your property with Dubai&apos;s most trusted real estate agency.
              We handle everything from valuation to closing — so you don&apos;t have to.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/sell">
                <Button variant="primary" size="lg" className="shadow-2xl shadow-accent/20">
                  List Your Property <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
