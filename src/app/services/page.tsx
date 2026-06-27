"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Handshake, SearchCheck, Building2, PieChart, FileCheck, ShieldCheck, IdCard } from "lucide-react";
import CTASection from "@/components/sections/CTASection";

const iconMap: Record<string, React.ReactNode> = {
  Handshake: <Handshake className="w-8 h-8" />,
  SearchCheck: <SearchCheck className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  PieChart: <PieChart className="w-8 h-8" />,
  FileCheck: <FileCheck className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  IdCard: <IdCard className="w-8 h-8" />,
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Our Services</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">
              Comprehensive Real Estate Services
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              End-to-end support for every stage of your Dubai property investment journey, from consultation to after-sales management.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl bg-warm-white hover:shadow-md transition-all duration-300"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <div className="text-accent">{iconMap[service.icon]}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-gray-500 mb-4">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
