"use client";

import { motion } from "framer-motion";
import { whyDubai } from "@/data/services";
import { Landmark, TrendingUp, Star, Building, ShieldCheck, CalendarCheck, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-7 h-7" />,
  TrendingUp: <TrendingUp className="w-7 h-7" />,
  Star: <Star className="w-7 h-7" />,
  Building: <Building className="w-7 h-7" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7" />,
  CalendarCheck: <CalendarCheck className="w-7 h-7" />,
};

export default function WhyDubaiSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-warm-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase">Why Dubai</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">
            Why Invest in <span className="text-gradient">Dubai</span>?
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Dubai has established itself as one of the world&apos;s most attractive investment destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyDubai.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-7 rounded-3xl bg-gradient-to-b from-white to-warm-white border border-gray-100 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 gradient-border"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <div className="text-accent">{iconMap[item.icon]}</div>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
