import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import StatsCounter from "@/components/sections/StatsCounter";
import DeveloperPartners from "@/components/sections/DeveloperPartners";
import ListPropertySection from "@/components/sections/ListPropertySection";
import WhyDubaiSection from "@/components/sections/WhyDubaiSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreview from "@/components/sections/BlogPreview";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <StatsCounter />
      <DeveloperPartners />
      <ListPropertySection />
      <WhyDubaiSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogPreview />
      <CTASection />
    </>
  );
}
