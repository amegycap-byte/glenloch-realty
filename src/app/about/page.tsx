"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { team } from "@/data/team";
import TeamCard from "@/components/shared/TeamCard";
import CTASection from "@/components/sections/CTASection";
import { Award, Globe, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We uphold the highest standards of service, integrity, and professionalism in every transaction.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our multilingual team serves clients from over 30 countries across multiple time zones.",
  },
  {
    icon: HeartHandshake,
    title: "Client First",
    description: "Every client receives a personalized approach tailored to their unique investment goals and circumstances.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">About Us</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 mb-3">
              Your Trusted Real Estate Partner
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Glenloch Realty is a premier real estate advisory firm dedicated to connecting global investors with exceptional property opportunities in Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a vision to bridge the gap between global investors and Dubai&apos;s thriving real estate market, 
                  Glenloch Realty has grown into one of the most trusted advisory firms in the region.
                </p>
                <p>
                  Our deep understanding of Dubai&apos;s property landscape, combined with strong relationships with leading 
                  developers and regulatory authorities, allows us to offer our clients unparalleled access to the 
                  best investment opportunities.
                </p>
                <p>
                  We pride ourselves on transparency, integrity, and a client-first approach. Every recommendation we 
                  make is backed by thorough research, comprehensive due diligence, and a genuine commitment to 
                  our clients&apos; long-term financial success.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Dubai skyline"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Meet Our Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Experienced professionals dedicated to helping you find the perfect property investment in Dubai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
