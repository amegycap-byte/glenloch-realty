"use client";

import { motion } from "framer-motion";
import { ArrowRight, Handshake, SearchCheck, Building2, PieChart, FileCheck, ShieldCheck, IdCard, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Handshake: <Handshake className="w-7 h-7" />,
  SearchCheck: <SearchCheck className="w-7 h-7" />,
  Building2: <Building2 className="w-7 h-7" />,
  PieChart: <PieChart className="w-7 h-7" />,
  FileCheck: <FileCheck className="w-7 h-7" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7" />,
  IdCard: <IdCard className="w-7 h-7" />,
};

export default function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-warm-white">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">
            Comprehensive <span className="text-gradient">Real Estate</span> Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            End-to-end support for every stage of your investment journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-7 rounded-3xl bg-white border border-gray-100 hover:border-accent/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500 relative">
                <div className="text-accent">{iconMap[service.icon]}</div>
              </div>

              <h3 className="text-lg font-bold text-primary mb-2 relative">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 relative">{service.description}</p>

              <ul className="space-y-2 relative">
                {service.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-500 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
                {service.items.length > 3 && (
                  <li className="text-accent text-xs font-medium">+{service.items.length - 3} more</li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
