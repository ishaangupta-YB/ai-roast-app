"use client";

import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px]">
      <Skeleton className="h-[400px] w-[80%] max-w-4xl rounded-2xl" />
    </div>
  ),
});

// const FAQSection = lazy(() => import('@/components/FAQSection'))
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => (
    <div className="flex items-center justify-center h-[300px]">
      <Skeleton className="h-[250px] w-[80%] max-w-4xl rounded-2xl" />
    </div>
  ),
});

const FooterSection = dynamic(() => import("@/components/FooterSection"), {
  loading: () => (
    <div className="h-[200px]">
      <Skeleton className="h-full w-full" />
    </div>
  ),
});

// const PricingSection = lazy(() => import("@/components/PricingSection"));
// const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[310px] w-[310px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 blur-3xl" />

      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        <HeroSection />
        <FeaturesSection />
      </main>

      <FooterSection />
    </div>
  );
}
