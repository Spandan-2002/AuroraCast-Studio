"use client";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowUpRight, Gauge, Headphones, Sparkles } from "lucide-react";

const metricCardStyles = "rounded-2xl border border-black-6/60 bg-black-2/60 px-6 py-4 shadow-[0_8px_40px_rgba(18,22,45,0.35)] backdrop-blur";

const formatMinutes = (seconds: number) => {
  if (!seconds) return "0 min";
  const minutes = Math.round(seconds / 60);
  return minutes < 120 ? `${minutes} min` : `${(minutes / 60).toFixed(1)} h`;
};

const CreatorToolbar = () => {
  const { user } = useUser();
  const authorId = user?.id;

  const creatorSnapshot = useQuery(
    api.podcasts.getPodcastByAuthorId,
    authorId ? { authorId } : "skip"
  );

  const totalPodcasts = creatorSnapshot?.podcasts.length ?? 0;
  const totalListeners = creatorSnapshot?.listeners ?? 0;
  const totalDuration = creatorSnapshot?.podcasts.reduce(
    (sum, podcast) => sum + (podcast.audioDuration ?? 0),
    0
  ) ?? 0;

  return (
    <section className="glassmorphism rounded-3xl border border-black-6/50 px-6 py-5 text-white-1">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <header className="flex flex-col gap-1">
          <p className="text-12 uppercase tracking-[0.28em] text-gray-1">
            Creator cockpit
          </p>
          <h2 className="text-24 font-semibold text-white-1">
            Shape your next immersive narrative
          </h2>
          <p className="text-14 text-white-4 lg:max-w-xl">
            Stay on top of your catalogue, see how listeners respond, and jump straight into crafting another episode.
          </p>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SignedIn>
            <Button asChild className="bg-orange-1 px-6 py-5 text-16 font-semibold text-white-1 shadow-[0_12px_30px_rgba(127,90,240,0.35)]">
              <Link href="/create-podcast">
                <Sparkles className="h-4 w-4" /> Launch Studio
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild className="bg-orange-1 px-6 py-5 text-16 font-semibold text-white-1">
              <Link href="/sign-in">Sign in to create</Link>
            </Button>
          </SignedOut>
          <Button asChild variant="outline" className="border border-black-6/50 bg-transparent px-6 py-5 text-16 font-semibold text-white-1/80 hover:bg-black-2">
            <Link href="/discover">
              Explore shows
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <article className={cn(metricCardStyles, "border-l-4 border-orange-1/80")}> 
          <header className="flex items-center gap-2 text-14 font-medium text-white-4">
            <Gauge className="h-4 w-4 text-orange-1" /> Episodes live
          </header>
          <p className="mt-2 text-24 font-semibold text-white-1">{totalPodcasts}</p>
          <p className="text-12 text-white-4">Crafted under your AuroraCast profile</p>
        </article>

        <article className={cn(metricCardStyles, "border-l-4 border-teal-1/80")}> 
          <header className="flex items-center gap-2 text-14 font-medium text-white-4">
            <Headphones className="h-4 w-4 text-teal-1" /> Listener minutes
          </header>
          <p className="mt-2 text-24 font-semibold text-white-1">{formatMinutes(totalDuration)}</p>
          <p className="text-12 text-white-4">Total runtime available for your community</p>
        </article>

        <article className={cn(metricCardStyles, "border-l-4 border-orange-1/60")}> 
          <header className="flex items-center gap-2 text-14 font-medium text-white-4">
            <Sparkles className="h-4 w-4 text-orange-1" /> Listener spark
          </header>
          <p className="mt-2 text-24 font-semibold text-white-1">{totalListeners.toLocaleString()}</p>
          <p className="text-12 text-white-4">Lifetime plays and impressions across releases</p>
        </article>
      </div>
    </section>
  );
};

export default CreatorToolbar;
