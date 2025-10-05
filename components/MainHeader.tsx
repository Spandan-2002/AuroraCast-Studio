"use client";

import { navigationLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = (formData.get("query") as string)?.trim();
    if (!query) return;
    const encoded = encodeURIComponent(query);
    router.push(`/discover?search=${encoded}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black-6/60 bg-black-1/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-1 items-center gap-8">
          <Link href="/" className="flex items-center gap-6">
            <span className="flex size-24 items-center justify-center rounded-3xl border border-orange-1/40 bg-orange-1/10 p-3">
              <Image src="/icons/logo.svg" alt="AuroraCast" width={84} height={84} />
            </span>
            <div className="hidden flex-col text-white-1 sm:flex">
              <span className="text-2xl font-semibold tracking-wide">
                AuroraCast
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white-3">
                Audio intelligence studio
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-black-6/60 bg-black-2/60 px-2 py-1 text-sm lg:flex">
            {navigationLinks.map(({ route, label }) => {
              const isActive =
                pathname === route || pathname.startsWith(`${route}/`);
              return (
                <Link
                  key={route}
                  href={route}
                  className={cn(
                    "rounded-full px-4 py-2 font-medium transition-colors",
                    isActive
                      ? "bg-orange-1 text-white-1 shadow-[0_8px_22px_rgba(127,90,240,0.35)]"
                      : "text-white-4 hover:bg-black-1/60 hover:text-white-1"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 items-center gap-2 pl-8 pr-6 sm:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white-4" />
            <Input
              name="query"
              placeholder="Search episodes, creators, ideas..."
              className="input-class w-full pl-12 pr-4"
            />
          </div>
        </form>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="flex lg:hidden">
            <MobileNav />
          </div>
          <SignedOut>
            <Button asChild className="hidden bg-orange-1 text-white-1 sm:flex">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              asChild
              className="hidden bg-orange-1 text-white-1 shadow-[0_10px_24px_rgba(127,90,240,0.35)] sm:flex"
            >
              <Link href="/create-podcast">New project</Link>
            </Button>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
