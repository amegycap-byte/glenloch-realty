"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn, PropertyType } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface Filters {
  type: PropertyType | "";
  bedrooms: string;
  priceMin: string;
  priceMax: string;
  location: string;
}

interface SearchFiltersProps {
  onFilter: (filters: Filters) => void;
  transactionType: "buy" | "rent";
}

const propertyTypes: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "commercial", label: "Commercial" },
];

const bedroomOptions = [
  { value: "", label: "Any" },
  { value: "0", label: "Studio" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const locations = [
  "All Locations",
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Dubai Hills Estate",
  "Business Bay",
  "Jumeirah Village Circle",
  "Emirates Hills",
  "Dubai Creek Harbour",
  "JBR",
  "DIFC",
  "District One",
];

export default function SearchFilters({ onFilter, transactionType }: SearchFiltersProps) {
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: "",
    bedrooms: "",
    priceMin: "",
    priceMax: "",
    location: "",
  });

  const updateFilter = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  const clearFilters = () => {
    const cleared: Filters = { type: "", bedrooms: "", priceMin: "", priceMax: "", location: "" };
    setFilters(cleared);
    onFilter(cleared);
  };

  const hasFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-accent" />
          <span className="font-semibold text-primary">Filters</span>
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-accent text-sm font-medium hover:underline"
        >
          {showMore ? "Less Filters" : "More Filters"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Property Type</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
          >
            {bedroomOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Min {transactionType === "rent" ? "Annual Rent" : "Price"}
          </label>
          <select
            value={filters.priceMin}
            onChange={(e) => updateFilter("priceMin", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
          >
            <option value="">No Min</option>
            {transactionType === "rent"
              ? ["50000", "100000", "150000", "200000", "300000"].map((p) => (
                  <option key={p} value={p}>AED {parseInt(p).toLocaleString()}</option>
                ))
              : ["500000", "1000000", "2000000", "5000000", "10000000"].map((p) => (
                  <option key={p} value={p}>AED {parseInt(p).toLocaleString()}</option>
                ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Max {transactionType === "rent" ? "Annual Rent" : "Price"}
          </label>
          <select
            value={filters.priceMax}
            onChange={(e) => updateFilter("priceMax", e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
          >
            <option value="">No Max</option>
            {transactionType === "rent"
              ? ["100000", "200000", "300000", "500000", "1000000"].map((p) => (
                  <option key={p} value={p}>AED {parseInt(p).toLocaleString()}</option>
                ))
              : ["1000000", "3000000", "5000000", "10000000", "20000000"].map((p) => (
                  <option key={p} value={p}>AED {parseInt(p).toLocaleString()}</option>
                ))}
          </select>
        </div>

        {showMore && (
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="block text-xs text-gray-500 mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm bg-white"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc === "All Locations" ? "" : loc}>{loc}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 text-xs transition-colors"
          >
            <X className="w-3 h-3" /> Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
