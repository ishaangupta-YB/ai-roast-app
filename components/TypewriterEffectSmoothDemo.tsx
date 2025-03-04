"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function TypewriterEffectSmoothDemo() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const loadingStates = [
    {
      text: "Setting Up...",
    },
    {
      text: "Get ready to roast...",
    },
    {
      text: "Almost done...",
    },
    {
      text: "Brace yourself...",
    },
  ];
 
  const handleNavigation = (url: string) => {
    setIsLoading(true);
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[30rem]">
      {isLoading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={2000}
        />
      )}

      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Roast Your Friends With{" "}
          <Highlight className="text-black dark:text-white">Roastify</Highlight>
          <p className="max-w-4xl text-center mx-auto text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mt-8">
            {`We're talking brutal, no-holds-barred, laugh-till-you-cry roasts that'll leave your friends begging for mercy.`}
          </p>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 mt-12 py-2 mx-auto justify-center items-center">
            <Button
              onClick={() => handleNavigation("/dashboard")}
              className="w-40 h-10 rounded-xl font-bold group/arrow"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Start Roasting"}
              {!isLoading && (
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              )}
            </Button>
            <Button
              asChild
              variant="secondary"
              className="w-40 h-10 rounded-xl font-bold border border-black"
            >
              <Link href="/sign-in">Join Now</Link>
            </Button>
          </div>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
} 