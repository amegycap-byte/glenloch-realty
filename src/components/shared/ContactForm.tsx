"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { saveLead, generateLeadId } from "@/lib/leads/storage";
import { PropertyPurpose } from "@/lib/leads/types";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone is required"),
  enquiryType: z.string().min(1, "Select an enquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const enquiryTypes = [
  "Property Viewing",
  "Investment Consultation",
  "Valuation",
  "Property Management",
  "Mortgage Advice",
  "General Enquiry",
];

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    const purposeMap: Record<string, PropertyPurpose> = {
      "Investment Consultation": "investment",
      "Property Viewing": "home",
      "Valuation": "sell",
      "Property Management": "investment",
      "Mortgage Advice": "home",
      "General Enquiry": "browsing",
    };
    saveLead({
      id: generateLeadId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      budget: "",
      propertyType: "",
      location: "",
      purpose: purposeMap[data.enquiryType] || "browsing",
      nationality: "",
      source: "website",
      status: "new",
      notes: data.message,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-semibold text-primary mb-2">Thank You!</h3>
        <p className="text-gray-600 max-w-md">
          We&apos;ve received your enquiry. A member of our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            {...register("phone")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
            placeholder="+971 50 123 4567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type *</label>
          <select
            {...register("enquiryType")}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
          >
            <option value="">Select type</option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.enquiryType && <p className="text-red-500 text-xs mt-1">{errors.enquiryType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          {...register("message")}
          rows={compact ? 3 : 4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white resize-none"
          placeholder="Tell us about your requirements..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Send Enquiry
          </>
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </form>
  );
}
