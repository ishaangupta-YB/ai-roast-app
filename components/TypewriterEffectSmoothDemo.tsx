"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
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

  const words = [
    {
      text: "Roast",
    },
    {
      text: "Your",
    },
    {
      text: "Friends",
    },
    {
      text: "With",
    },
    {
      text: "Roastify.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const handleNavigation = (url: string) => {
    setIsLoading(() => {
      return true;
    });
    try {
      router.push(url);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center h-[30rem]  ">
      {isLoading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={2000}
        />
      )}

      {/* <div className="text-center space-y-8 py-10">
        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
          <h1>
            Roast Your
            <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Friends
            </span>
            With Roastify
          </h1>
        </div>
      </div> */}

      {/* <TypewriterEffectSmooth words={words} /> */}

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
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-0 md:space-x-4 mt-12 py-2 mx-auto justify-center">
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
              className="w-40 h-10 rounded-xl font-bold border border-black "
            >
              <Link href="/sign-in">Join Now</Link>
            </Button>
          </div>
        </motion.h1>
      </HeroHighlight>
    </div>
  );
}
