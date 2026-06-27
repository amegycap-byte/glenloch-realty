"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Bed, Bath, Maximize, MapPin, TrendingUp } from "lucide-react";
import { cn, formatPrice, Property } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact";
}

export default function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: y * -12 });
  };

  const isOffPlan = property.status === "off-plan";

  return (
    <Link
      ref={cardRef}
      href={`/properties/${property.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 perspective-1000"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02,1.02,1.02)`
          : "perspective(1000px) rotateX(0) rotateY(0)",
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isOffPlan && (
            <span className="bg-gradient-to-r from-accent to-accent-dark text-primary text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg">
              OFF-PLAN
            </span>
          )}
          {property.featured && !isOffPlan && (
            <span className="bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              FEATURED
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
            property.transactionType === "rent"
              ? "bg-white/90 text-primary"
              : "bg-accent/90 text-primary"
          }`}>
            {property.transactionType === "rent" ? "FOR RENT" : "FOR SALE"}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass rounded-2xl px-4 py-3 inline-block">
            <p className="text-white font-bold text-xl">
              {property.transactionType === "rent" ? `${formatPrice(property.price)}/yr` : formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* Shimmer on image hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-primary text-base leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {property.title}
          </h3>
          {property.developer && (
            <span className="text-accent text-xs font-semibold shrink-0 bg-accent/10 px-2 py-1 rounded-lg">
              {property.developer.split(" ")[0]}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-accent" /> {property.location}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-accent" /> {property.bedrooms === 0 ? "Studio" : property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-accent" /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-accent" /> {property.areaSize.toLocaleString()} {property.areaUnit}
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>
    </Link>
  );
}
