"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutDashboard, Mic2 } from "lucide-react";
import React from "react";

const iconByRoute: Record<string, React.ReactNode> = {
  "/": <LayoutDashboard className="h-5 w-5" />,
  "/discover": <Compass className="h-5 w-5" />,
  "/create-podcast": <Mic2 className="h-5 w-5" />,
};

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-black-1 text-white-1"
        >
          <Link href="/" className="flex items-center gap-3 pb-10 pl-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-1/15 p-2.5">
              <Image src="/icons/logo.svg" alt="AuroraCast" width={32} height={32} />
            </span>
            <span className="text-26 font-extrabold tracking-wide">AuroraCast</span>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-4 text-white-1">
                {navigationLinks.map(({ route, label }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);

                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-4 py-3",
                          {
                            "bg-nav-focus text-white-1 shadow-[0_14px_30px_rgba(88,55,189,0.25)]":
                              isActive,
                            "text-white-4": !isActive,
                          }
                        )}
                      >
                        {iconByRoute[route]}
                        <p className="text-16 font-semibold">{label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
