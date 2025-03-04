"use client";
import { featureList } from "@/lib/feature-list";
import { HoverEffect } from "./ui/card-hover-effect";
import { motion } from "framer-motion";

function FeaturesSection() {
  return (
    <section id="features" className="container py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
          Powerful Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to Roast
        </h2>
        <p className="md:w-3/4 mx-auto text-xl text-muted-foreground">
          Our features will provide you with an unmatched experience and help you
          achieve your goals with a touch of humor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <HoverEffect
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          items={featureList.map(({ icon: Icon, title, description, href }) => ({
            title,
            description,
            link: href,
            icon: Icon,
          }))}
        />
      </motion.div>
    </section>
  );
}

export default FeaturesSection;
