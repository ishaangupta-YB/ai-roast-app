import { SheetMenu } from "./sheet-menu";
import { ModeToggle } from "../ModeToggle";
import { UserNav } from "./user-nav";
import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavbarProps {
  title: string;
}

export function DashboardNavbar({ title }: NavbarProps) {
  const { userId } = auth();
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          {userId ? (
            <UserNav />
          ) : (
            <Button className="bg-white rounded-xl px-4 py-2 font-bold border border-black mr-2">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
