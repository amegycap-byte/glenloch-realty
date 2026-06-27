"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, FileText, Users, Clock, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/shared/ContactForm";
import Link from "next/link";

const benefits = [
  { icon: Star, title: "10-Year Renewable Visa", description: "Qualify for a long-term residency visa valid for 10 years, automatically renewable." },
  { icon: Users, title: "Family Sponsorship", description: "Sponsor your spouse, children, and parents under your Golden Visa." },
  { icon: ShieldCheck, title: "100% Ownership", description: "Full foreign ownership of the property with no local partner required." },
  { icon: Clock, title: "No Minimum Stay", description: "No requirement to reside in the UAE to maintain your visa status." },
  { icon: FileText, title: "Simplified Process", description: "Straightforward application process with our expert guidance." },
  { icon: CheckCircle, title: "Work & Study", description: "Permission to work, study, and conduct business in the UAE." },
];

const requirements = [
  { title: "Property Value", detail: "Minimum AED 2 million (approximately USD 545,000)" },
  { title: "Property Type", detail: "Freehold property in designated investment areas" },
  { title: "Payment Status", detail: "Fully paid or with a payment plan from a registered bank" },
  { title: "Off-Plan Eligible", detail: "Off-plan properties with a minimum 50% down payment qualify" },
  { title: "Multiple Properties", detail: "Combine multiple properties to meet the AED 2M threshold" },
  { title: "Mortgage Eligible", detail: "Properties with a mortgage from UAE banks are eligible" },
];

export default function GoldenVisaPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">UAE Golden Visa</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">
              Secure Your Future in Dubai
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mb-6">
              Invest in Dubai real estate and qualify for a 10-year renewable UAE Golden Visa — a pathway to
              long-term residency, business opportunities, and an exceptional lifestyle.
            </p>
            <Link href="#form">
              <Button size="lg">Check Your Eligibility</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Golden Visa Benefits</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The UAE Golden Visa is one of the world&apos;s most attractive residency-by-investment programs, offering unparalleled benefits.
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
                className="p-6 rounded-2xl bg-warm-white"
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

      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Eligibility Requirements</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Qualifying for the Golden Visa through property investment is straightforward. Here&apos;s what you need:
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {requirements.map((req, i) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm"
                >
                  <div className="bg-accent/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">{req.title}</h4>
                    <p className="text-gray-500 text-sm">{req.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3">Check Your Golden Visa Eligibility</h2>
            <p className="text-gray-500">
              Fill in your details and our Golden Visa specialists will assess your eligibility and guide you through the process.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-warm-white p-6 sm:p-8 rounded-2xl shadow-sm"
          >
            <ContactForm compact />
          </motion.div>
        </div>
      </section>
    </>
  );
}
