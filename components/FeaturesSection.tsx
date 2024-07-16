"use client";
import { featureList } from "@/lib/feature-list";
import { HoverEffect } from "./ui/card-hover-effect";

function FeaturesSection()  {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Features
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Our features will provide you with an unmatched experience and help you
        achieve your goals with a touch of humor.
      </h3>

      <HoverEffect
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        items={featureList.map(({ icon: Icon, title, description, href }) => ({
          title,
          description,
          link: href,
          icon: Icon,
        }))}
      />
    </section>
  );
};
export default  FeaturesSection
