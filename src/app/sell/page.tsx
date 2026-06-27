"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShieldCheck, DollarSign, ClipboardCheck, BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/shared/ContactForm";
import Link from "next/link";

const benefits = [
  { icon: TrendingUp, title: "Market Expertise", description: "Accurate property valuation based on current market data and recent comparable sales." },
  { icon: Users, title: "Wide Buyer Network", description: "Access to our extensive database of qualified local and international buyers." },
  { icon: ShieldCheck, title: "Hassle-Free Process", description: "We handle viewings, negotiations, paperwork, and legal formalities." },
  { icon: DollarSign, title: "Best Price Guarantee", description: "Strategic marketing and negotiation to achieve the best possible sale price." },
  { icon: ClipboardCheck, title: "Professional Marketing", description: "High-quality photography, virtual tours, and targeted advertising campaigns." },
  { icon: BadgeCheck, title: "Free Valuation", description: "No-obligation property valuation with a detailed market analysis report." },
];

export default function SellPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Sell Your Property</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">List Your Property with Us</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Sell your Dubai property at the best price with our expert marketing and negotiation services.
              Free valuation included.
            </p>
            <Link href="#form">
              <Button size="lg" className="mt-6">Get a Free Valuation</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Why Choose Glenloch to Sell?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We combine deep market knowledge with proven marketing strategies to sell your property quickly at the best price.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3">Request a Free Valuation</h2>
            <p className="text-gray-500">
              Fill in your details below and one of our experts will contact you within 24 hours with a comprehensive property valuation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm"
          >
            <ContactForm compact />
          </motion.div>
        </div>
      </section>
    </>
  );
}
