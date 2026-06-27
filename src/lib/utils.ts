import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `AED ${(price / 1_000_000).toFixed(2)}M`;
  }
  if (price >= 1_000) {
    return `AED ${(price / 1_000).toFixed(0)}K`;
  }
  return `AED ${price.toLocaleString()}`;
}

export function formatPriceAnnual(price: number): string {
  return `AED ${price.toLocaleString()}/yr`;
}

export type PropertyType = "apartment" | "villa" | "townhouse" | "penthouse" | "commercial";
export type TransactionType = "buy" | "rent";
export type PropertyStatus = "ready" | "off-plan";

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  transactionType: TransactionType;
  status: PropertyStatus;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  areaUnit: "sqft" | "sqm";
  description: string;
  features: string[];
  images: string[];
  developer?: string;
  paymentPlan?: string;
  completionDate?: string;
  latitude?: number;
  longitude?: number;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  phone: string;
  email: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}
