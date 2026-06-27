"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Buy Property", href: "/buy" },
    { label: "Rent Property", href: "/rent" },
    { label: "Off-Plan Projects", href: "/off-plan" },
    { label: "Sell Your Property", href: "/sell" },
    { label: "Golden Visa", href: "/golden-visa" },
  ],
  Services: [
    { label: "Investment Consultation", href: "/services" },
    { label: "Property Management", href: "/services" },
    { label: "Due Diligence", href: "/services" },
    { label: "Transaction Support", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Meet the Team", href: "/about" },
    { label: "Blog & Insights", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg group-hover:shadow-accent/30 transition-all duration-500">
                <span className="text-primary font-extrabold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl">
                Glenloch <span className="text-gradient">Realty</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-sm">
              Premium real estate advisory firm specializing in freehold investment opportunities in Dubai.
              <span className="text-accent"> We connect global investors with carefully selected properties.</span>
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:+97145001234" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-all duration-300 group/link">
                <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover/link:bg-accent/20 transition-colors">
                  <Phone className="w-4 h-4 text-accent" />
                </span>
                +971 4 500 1234
              </a>
              <a href="mailto:info@glenlochrealty.com" className="flex items-center gap-3 text-gray-400 hover:text-accent transition-all duration-300 group/link">
                <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover/link:bg-accent/20 transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                </span>
                info@glenlochrealty.com
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </span>
                <span>
                  Office 1501, Burj Crown Tower, <br />Business Bay, Dubai, UAE
                </span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-accent text-sm tracking-wider uppercase mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-accent hover:translate-x-1 text-sm transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Glenloch Realty. All rights reserved.
            <Link href="/terms" className="hover:text-accent ml-2 transition-colors">Terms</Link>
            <span className="mx-1.5 text-gray-600">|</span>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
          </p>
          <div className="flex items-center gap-4">
            {["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-gray-500 hover:text-accent transition-all duration-300 text-xs hover:translate-y-[-2px] inline-block"
              >
                {s}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 hover:scale-110 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
