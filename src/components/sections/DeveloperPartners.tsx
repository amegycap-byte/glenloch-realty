"use client";

import { motion } from "framer-motion";
import { Home, MapPin, Sparkles } from "lucide-react";

const partnerLogos = [
  { src: "/images/partners/PHOTO-2026-06-27-21-23-12.jpg", name: "Partner 1" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-13.jpg", name: "Partner 2" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-13_1.jpg", name: "Partner 3" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-13_2.jpg", name: "Partner 4" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-14.jpg", name: "Partner 5" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-14_1.jpg", name: "Partner 6" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-14_2.jpg", name: "Partner 7" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-15.jpg", name: "Partner 8" },
  { src: "/images/partners/PHOTO-2026-06-27-21-23-15_1.jpg", name: "Partner 9" },
];

const locations = [
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "UAE", flag: "🇦🇪" },
];

export default function DeveloperPartners() {
  return (
    <section className="py-24 relative overflow-hidden bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase">Our Network</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">
            Partner <span className="text-gradient">Developers</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            We work with the most trusted developers across the region to bring you premium investment opportunities.
          </p>
        </motion.div>

        {/* Developer Logos */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-16">
          {partnerLogos.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        {/* Freehold + Locations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-2xl px-6 py-4"
          >
            <Home className="w-6 h-6 text-accent" />
            <div>
              <span className="text-accent font-semibold text-sm">Freehold Properties</span>
              <p className="text-gray-500 text-xs">Full ownership for international investors</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold border border-accent/20"
              >
                <MapPin className="w-4 h-4 text-accent" />
                {loc.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
