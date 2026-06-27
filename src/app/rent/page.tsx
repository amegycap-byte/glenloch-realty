"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/shared/PropertyCard";
import SearchFilters from "@/components/shared/SearchFilters";
import CTASection from "@/components/sections/CTASection";
import { MapPin } from "lucide-react";

type Filters = {
  type: string;
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  location: string;
};

export default function RentPage() {
  const [filters, setFilters] = useState<Filters>({
    type: "",
    bedrooms: "",
    priceMin: "",
    priceMax: "",
    location: "",
  });

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (p.transactionType !== "rent") return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.bedrooms !== "") {
        const minBeds = parseInt(filters.bedrooms);
        if (p.bedrooms < minBeds) return false;
      }
      if (filters.priceMin && p.price < parseInt(filters.priceMin)) return false;
      if (filters.priceMax && p.price > parseInt(filters.priceMax)) return false;
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <section className="pt-32 pb-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">Rent Property in Dubai</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Find premium rental properties across Dubai&apos;s most sought-after communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFilters onFilter={setFilters} transactionType="rent" />
        </div>
      </section>

      <section className="pb-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-6">
            Showing <span className="font-semibold text-primary">{filtered.length}</span> properties
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">No properties found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
