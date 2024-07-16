// import {FAQSection} from "@/components/FAQSection";
// import {FeaturesSection} from "@/components/FeaturesSection";
// import {FooterSection} from "@/components/FooterSection";
// import HeroSection from "@/components/HeroSection";
// import { Navbar } from "@/components/Navbar";
// import {PricingSection} from "@/components/PricingSection";
// import {TestimonialSection} from "@/components/TestimonialSection";

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <HeroSection />
//       <FeaturesSection />
//       <TestimonialSection />
//       <PricingSection />
//       <FAQSection/>
//       <FooterSection />
//     </>
//   );
// }


import { lazy, Suspense } from 'react';
import { Navbar } from "@/components/Navbar";
import { Skeleton } from '@/components/ui/skeleton';

const HeroSection = lazy(() => import('@/components/HeroSection'))  
const FAQSection = lazy(() => import('@/components/FAQSection'))
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <TestimonialSection />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"  />}>
        <FooterSection />
      </Suspense>
    </>
  );
}
