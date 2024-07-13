import { SheetMenu } from "./sheet-menu";
import { ModeToggle } from "../ModeToggle";
import { UserNav } from "./user-nav";
import { auth, currentUser } from "@clerk/nextjs/server";

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
          {userId && <UserNav />}
        </div>
      </div>
    </header>
  );
}
