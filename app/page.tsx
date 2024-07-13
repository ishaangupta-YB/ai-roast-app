import {FeaturesSection} from "@/components/FeaturesSection";
import {FooterSection} from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import {PricingSection} from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <FooterSection />
    </>
  );
}
