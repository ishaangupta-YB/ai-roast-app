"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
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
  return (
    <div className="flex flex-col items-center  justify-center h-[30rem]  ">
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
      
      <TypewriterEffectSmooth words={words} /> 
      <p className="max-w-screen-sm mx-auto text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mt-4">
        {`Step into the ring and let Roastify eviscerate your profiles. We're talking brutal, no-holds-barred, laugh-till-you-cry roasts that'll leave your friends begging for mercy.`}
      </p>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-0 md:space-x-4 py-12">
        <Button className="w-40 h-10 rounded-xl font-bold group/arrow">
          <Link href="/dashboard">Start Roasting</Link>
          <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
        </Button>
        <Button
          asChild
          variant="secondary"
          className="w-40 h-10 rounded-xl font-bold border border-black "
        >
          <Link href="/sign-in">Join Now</Link>
        </Button>
      </div>
    </div>
  );
}
