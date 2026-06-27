import { properties } from "@/data/properties";
import PropertyDetailClient from "./property-detail-client";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function PropertyDetailPage() {
  return <PropertyDetailClient />;
}
