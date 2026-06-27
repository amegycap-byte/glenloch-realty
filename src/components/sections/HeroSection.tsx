"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronRight, ChevronDown, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchBedrooms, setSearchBedrooms] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (searchType) params.set("type", searchType);
    if (searchBedrooms) params.set("bedrooms", searchBedrooms);
    if (searchBudget) params.set("budget", searchBudget);
    router.push(`/buy?${params.toString()}`);
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-[500px] lg:min-h-[75vh] flex items-center overflow-hidden bg-[#0A1E3D]">
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1572334424/photo/dubai.jpg?s=2048x2048&w=is&k=20&c=nS0OaH9iYDvw6ss71Dh95Rqg_cqj0O4zbAsYJjFc_i0=)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.15em] uppercase">
                Dubai&apos;s Premium Real Estate Advisory
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4"
          >
            Discover Dubai's Best Properties
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg leading-relaxed"
          >
            Your trusted partner for premium real estate in Dubai. Expert guidance from consultation to closing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <Link href="/buy">
              <Button size="lg">
                <Search className="w-4 h-4" /> Explore Properties
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Book a Consultation
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 text-xs"
          >
            <div className="flex items-center gap-1 text-gray-400">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="ml-1 text-accent font-semibold">4.9</span>
              <span className="text-gray-500">(500+ reviews)</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Est. 2015</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">RERA Approved</span>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 max-w-4xl"
          >
            <div className="glass-dark rounded-2xl p-2 sm:p-3 backdrop-blur-xl border border-white/10">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1 min-w-0 relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                    Location
                  </label>
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="" className="bg-[#0A1E3D]">All Dubai</option>
                    <option value="Downtown Dubai" className="bg-[#0A1E3D]">Downtown Dubai</option>
                    <option value="Dubai Marina" className="bg-[#0A1E3D]">Dubai Marina</option>
                    <option value="Palm Jumeirah" className="bg-[#0A1E3D]">Palm Jumeirah</option>
                    <option value="Business Bay" className="bg-[#0A1E3D]">Business Bay</option>
                    <option value="Dubai Hills Estate" className="bg-[#0A1E3D]">Dubai Hills Estate</option>
                    <option value="Emirates Hills" className="bg-[#0A1E3D]">Emirates Hills</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex-1 min-w-0 relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                    Type
                  </label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="" className="bg-[#0A1E3D]">All Types</option>
                    <option value="apartment" className="bg-[#0A1E3D]">Apartment</option>
                    <option value="villa" className="bg-[#0A1E3D]">Villa</option>
                    <option value="townhouse" className="bg-[#0A1E3D]">Townhouse</option>
                    <option value="penthouse" className="bg-[#0A1E3D]">Penthouse</option>
                    <option value="commercial" className="bg-[#0A1E3D]">Commercial</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex-1 min-w-0 relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                    Bedrooms
                  </label>
                  <select
                    value={searchBedrooms}
                    onChange={(e) => setSearchBedrooms(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="" className="bg-[#0A1E3D]">Any</option>
                    <option value="studio" className="bg-[#0A1E3D]">Studio</option>
                    <option value="1" className="bg-[#0A1E3D]">1+</option>
                    <option value="2" className="bg-[#0A1E3D]">2+</option>
                    <option value="3" className="bg-[#0A1E3D]">3+</option>
                    <option value="4" className="bg-[#0A1E3D]">4+</option>
                    <option value="5" className="bg-[#0A1E3D]">5+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex-1 min-w-0 relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                    Price Range
                  </label>
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                  >
                    <option value="" className="bg-[#0A1E3D]">Any Price</option>
                    <option value="0-1000000" className="bg-[#0A1E3D]">Under AED 1M</option>
                    <option value="1000000-3000000" className="bg-[#0A1E3D]">AED 1M - 3M</option>
                    <option value="3000000-5000000" className="bg-[#0A1E3D]">AED 3M - 5M</option>
                    <option value="5000000-10000000" className="bg-[#0A1E3D]">AED 5M - 10M</option>
                    <option value="10000000-999999999" className="bg-[#0A1E3D]">AED 10M+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full lg:w-auto bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                  >
                    <Search className="w-4 h-4" /> Search
                  </button>
                </div>
              </div>

              {/* More Filters Toggle */}
              <div className="mt-2">
                <button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-colors px-1"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showMoreFilters ? "rotate-180" : ""}`} />
                  {showMoreFilters ? "Less Filters" : "More Filters"}
                </button>

                {showMoreFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                        Status
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                      >
                        <option value="" className="bg-[#0A1E3D]">All Status</option>
                        <option value="ready" className="bg-[#0A1E3D]">Ready</option>
                        <option value="off-plan" className="bg-[#0A1E3D]">Off-Plan</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                        Purpose
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                      >
                        <option value="" className="bg-[#0A1E3D]">Buy & Rent</option>
                        <option value="buy" className="bg-[#0A1E3D]">For Sale</option>
                        <option value="rent" className="bg-[#0A1E3D]">For Rent</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1 px-1 font-semibold">
                        Area (sqft)
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer pr-8"
                      >
                        <option value="" className="bg-[#0A1E3D]">Any Size</option>
                        <option value="0-1000" className="bg-[#0A1E3D]">Under 1,000</option>
                        <option value="1000-2000" className="bg-[#0A1E3D]">1,000 - 2,000</option>
                        <option value="2000-5000" className="bg-[#0A1E3D]">2,000 - 5,000</option>
                        <option value="5000-999999" className="bg-[#0A1E3D]">5,000+</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-[38px] w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
