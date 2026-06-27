"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Building2, Users, TrendingUp, Home, Award, UserCheck } from "lucide-react";

const stats = [
  { icon: Building2, value: 500, suffix: "+", label: "Properties Sold" },
  { icon: Users, value: 1000, suffix: "+", label: "Happy Customers" },
  { icon: TrendingUp, value: 1, suffix: "B+", label: "Sales" },
  { icon: Home, value: 200, suffix: "+", label: "Properties Listed" },
  { icon: Award, value: 98, suffix: "%", label: "Satisfaction" },
  { icon: UserCheck, value: 10, suffix: "K+", label: "Buyer Network" },
];

function CountUp({ end, duration = 2000, started }: { end: number; duration?: number; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, started]);
  return <>{count.toLocaleString()}</>;
}

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1A33 0%, #0F2548 50%, #1A3366 100%)" }}>
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent/[0.08] rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/[0.05] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-flex mb-5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 border border-accent/20">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
              </div>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mb-1.5">
                <CountUp end={stat.value} started={inView} />
                {stat.suffix}
              </p>
              <p className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
