"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ArrowUpRight, Flame, Focus, Lightbulb, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cardClass =
  "rounded-3xl border border-black-6/50 bg-black-1/70 px-6 py-5 text-white-1 shadow-[0_14px_40px_rgba(10,12,29,0.45)] backdrop-blur";

const InsightsPanel = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  const trendingCards = (trendingPodcasts ?? []).slice(0, 3);
  const risingCreators = (topPodcasters ?? []).slice(0, 4);

  return (
    <aside className="hidden w-full max-w-xs flex-col gap-6 lg:flex">
      <section className={cn(cardClass, "bg-gradient-to-br from-black-1 via-black-2 to-black-1")}> 
        <SignedIn>
          <div className="flex flex-col gap-3">
            <span className="text-12 uppercase tracking-[0.32em] text-white-3">
              Welcome back
            </span>
            <h3 className="text-18 font-semibold text-white-1">
              {user?.firstName}, your creative cadence is on point.
            </h3>
            <p className="text-14 text-white-4">
              Plan the next drop, review listener spikes, or sketch a story arc. AuroraCast keeps your studio in motion.
            </p>
            {user?.id ? (
              <Link
                href={`/profile/${user.id}`}
                className="inline-flex items-center gap-2 text-14 font-semibold text-orange-1"
              >
                View creator profile <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col gap-3">
            <span className="text-12 uppercase tracking-[0.32em] text-white-3">
              Studio access
            </span>
            <h3 className="text-18 font-semibold text-white-1">
              Sign in to unlock collaborative editing.
            </h3>
            <p className="text-14 text-white-4">
              Bring your hosts, producers, and AI co-writers into the same sonic canvas.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-14 font-semibold text-orange-1"
            >
              Join AuroraCast <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </SignedOut>
      </section>

      <section className={cardClass}>
        <header className="mb-4 flex items-center gap-2 text-14 font-semibold text-white-4">
          <Flame className="h-4 w-4 text-orange-1" /> Trending stories this week
        </header>
        <div className="flex flex-col gap-4">
          {trendingCards.length > 0 ? trendingCards.map((podcast) => (
            <Link
              key={podcast._id}
              href={`/podcasts/${podcast._id}`}
              className="group flex items-center gap-3 rounded-2xl border border-transparent px-2 py-1 transition-colors hover:border-orange-1/50"
            >
              <Image
                src={podcast.imageUrl || "/icons/emptyState.svg"}
                alt={podcast.podcastTitle}
                width={44}
                height={44}
                className="size-12 rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col">
                <p className="text-14 font-semibold text-white-1 group-hover:text-orange-1">
                  {podcast.podcastTitle}
                </p>
                <span className="text-12 text-white-4">
                  {podcast.views.toLocaleString()} plays · {podcast.voiceType}
                </span>
              </div>
              <Waves className="h-4 w-4 text-white-4" />
            </Link>
          )) : (
            <p className="text-12 text-white-4">
              Upload episodes to populate momentum insights.
            </p>
          )}
        </div>
      </section>

      <section className={cardClass}>
        <header className="mb-4 flex items-center gap-2 text-14 font-semibold text-white-4">
          <Focus className="h-4 w-4 text-teal-1" /> Rising creators
        </header>
        <div className="flex flex-col gap-4">
          {risingCreators.length > 0 ? risingCreators.map((podcaster) => (
            <Link
              key={podcaster._id}
              href={`/profile/${podcaster.clerkId}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-transparent px-2 py-1 transition-colors hover:border-teal-1/50"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={podcaster.imageUrl || "/icons/avatar.svg"}
                  alt={podcaster.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-xl object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-14 font-semibold text-white-1 group-hover:text-teal-1">
                    {podcaster.name}
                  </p>
                  <span className="text-12 text-white-4">
                    {podcaster.totalPodcasts} live shows
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white-4" />
            </Link>
          )) : (
            <p className="text-12 text-white-4">
              No creators yet. Publish an episode to join the charts.
            </p>
          )}
        </div>
      </section>

      <section className={cardClass}>
        <header className="mb-3 text-14 font-semibold text-white-4">
          <Lightbulb className="mr-2 inline h-4 w-4 text-orange-1" /> Session blueprint
        </header>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-12 text-white-4">
          <li>Record a five-minute cold open to set the mood.</li>
          <li>Upload notes to let AuroraCast auto-outline your narrative.</li>
          <li>Layer ambient loops with the new adaptive soundbed feature.</li>
        </ul>
      </section>
    </aside>
  );
};

export default InsightsPanel;
