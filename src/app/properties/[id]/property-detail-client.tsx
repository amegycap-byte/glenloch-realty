"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { properties } from "@/data/properties";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Building2,
  CheckCircle,
  Calendar,
  Phone,
  MessageCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/shared/ContactForm";
import CTASection from "@/components/sections/CTASection";
import { formatPrice } from "@/lib/utils";

export default function PropertyDetailPage() {
  const params = useParams();
  const property = properties.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <section className="pt-32 pb-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Property Not Found</h1>
          <p className="text-gray-500 mb-6">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/buy">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Browse Properties</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-24 pb-0 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={property.transactionType === "buy" ? "/buy" : "/rent"}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-accent text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {property.transactionType === "buy" ? "Buy" : "Rent"}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden"
            >
              <Image
                src={property.images[selectedImage]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.status === "off-plan" && (
                  <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">OFF-PLAN</span>
                )}
                <span className="bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {property.transactionType === "rent" ? "FOR RENT" : "FOR SALE"}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {property.images.slice(0, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-accent" : "border-transparent hover:border-accent/50"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">{property.title}</h1>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" /> {property.location}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-accent">
                    {property.transactionType === "rent" ? `${formatPrice(property.price)}/yr` : formatPrice(property.price)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 py-4 border-y border-gray-200">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-accent" />
                    <span className="text-gray-600">
                      {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bedrooms`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-accent" />
                    <span className="text-gray-600">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5 text-accent" />
                    <span className="text-gray-600">
                      {property.areaSize.toLocaleString()} {property.areaUnit}
                    </span>
                  </div>
                  {property.developer && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-accent" />
                      <span className="text-gray-600">{property.developer}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-bold text-primary mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold text-primary mb-3">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              {(property.paymentPlan || property.completionDate) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-warm-white p-6 rounded-2xl border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-primary mb-4">Payment & Completion</h2>
                  {property.paymentPlan && (
                    <div className="flex items-start gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Plan</p>
                        <p className="text-primary font-medium">{property.paymentPlan}</p>
                      </div>
                    </div>
                  )}
                  {property.completionDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Expected Completion</p>
                        <p className="text-primary font-medium">{property.completionDate}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                <h3 className="font-bold text-primary text-lg mb-4">Interested in This Property?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Contact us to schedule a viewing or get more information.
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+97145001234"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-light transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4" /> Call +971 4 500 1234
                  </a>
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#1DA851] transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-medium text-primary text-sm mb-4">Or send an enquiry</h4>
                  <ContactForm compact />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
