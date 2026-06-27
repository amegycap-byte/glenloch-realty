"use client";

import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/shared/PropertyCard";
import CTASection from "@/components/sections/CTASection";
import { Building2, Clock, Calendar, ShieldCheck } from "lucide-react";

export default function OffPlanPage() {
  const offPlan = properties.filter((p) => p.status === "off-plan");

  const benefits = [
    {
      icon: Building2,
      title: "Lower Entry Prices",
      description: "Off-plan properties are typically 20-30% cheaper than ready properties in the same area.",
    },
    {
      icon: Clock,
      title: "Flexible Payment Plans",
      description: "Spread your payments over the construction period with 0% interest payment plans.",
    },
    {
      icon: Calendar,
      title: "Capital Appreciation",
      description: "Property values often increase by 15-30% between launch and handover.",
    },
    {
      icon: ShieldCheck,
      title: "Developer Guarantees",
      description: "Registered off-plan projects are protected by RERA escrow accounts and Oqood registration.",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Off-Plan Projects</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Invest in Dubai&apos;s future with exclusive off-plan opportunities from leading developers.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Why Invest Off-Plan?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Off-plan investment offers unique advantages for investors looking to maximize returns and build wealth strategically.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 bg-warm-white rounded-2xl"
              >
                <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8">Available Off-Plan Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offPlan.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
