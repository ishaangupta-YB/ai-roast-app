"use client";
import { FlameKindling, Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
  href: string;
}

const routeList: RouteProps[] = [
  {
    href: "#Features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];
const featureList: FeatureProps[] = [
  {
    title: "Roast LinkedIn",
    description:
      "Get a professional roast of your LinkedIn profile. Impress with your wit!",
    href: "/dashboard/linkedin-roast",
  },
  {
    title: "Roast GitHub",
    description:
      "Roast your GitHub repos and coding skills. Show off your humorous side!",
    href: "/dashboard/github-roast",
  },
  {
    title: "Roast Resume",
    description:
      "Have your resume roasted for a hilarious critique. Perfect for a laugh!",
    href: "/dashboard/resume-roast",
  },
  {
    title: "Roast LeetCode",
    description:
      "Get your LeetCode solutions roasted. Coding fun with a twist!",
    href: "/dashboard/leetcode-roast",
  },
  {
    title: "Roast Reddit",
    description:
      "Roast your Reddit posts. Let’s see how you fare in the roast battleground!",
    href: "/dashboard/reddit-roast",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link
        href="/"
        className="font-bold text-lg flex items-center text-blue-500"
      >
        <FlameKindling className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Roastify
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center text-blue-500">
                    <FlameKindling className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    Roastify
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <div>
                <ModeToggle />
                <div className="px-3">
                  <SignedOut>
                    <Button className="bg-white rounded-xl px-4 py-2 font-bold border border-black ">
                      <Link href="/sign-up">SignUp</Link>
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <SignOutButton>
                      <button className="bg-red-500 px-4 py-2 rounded">
                        Logout
                      </button>
                    </SignOutButton>
                  </SignedIn>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* <div className="grid w-[600px] grid-cols-2 gap-5 p-4"> */}
              <div className="grid w-[400px] gap-5 p-4">
                {/* <Image
                  src="https://avatars.githubusercontent.com/u/75042455?v=4"
                  alt="RadixLogo"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                /> */}
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description, href }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <Link href={href}>
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          {description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => {
              if (label === "Features") {
                return null;
              }
              return (
                <NavigationMenuLink key={href} asChild>
                  <Link href={href} className="text-base px-2">
                    {label}
                  </Link>
                </NavigationMenuLink>
              );
            })}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ModeToggle />

        {/* <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/ishaangupta-YB"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button> */}
        <div className="px-3">
          <SignedOut>
            <SignedOut>
              <Button className="bg-white rounded-xl px-4 py-2 font-bold border border-black ">
                <Link href="/sign-up">SignUp</Link>
              </Button>
            </SignedOut>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
