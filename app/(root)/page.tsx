"use client";

import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flame, Sparkles } from "lucide-react";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const recentPodcasts = useQuery(api.podcasts.getRecentlyPublishedPodcasts);
  const voiceHighlights = useQuery(api.podcasts.getVoiceTypeHighlights);

  const heroPodcast = trendingPodcasts?.[0];

  return (
    <div className="flex flex-col gap-10">
      <section className="glassmorphism relative isolate overflow-hidden rounded-3xl border border-black-6/40 px-6 py-8 sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 hidden md:flex"
          aria-hidden
        >
          {heroPodcast ? (
            <Image
              src={heroPodcast.imageUrl}
              alt={heroPodcast.podcastTitle}
              fill
              className="object-contain opacity-40"
            />
          ) : (
            <div className="relative h-72 w-72">
              <Image
                src="/icons/logo.svg"
                alt="AuroraCast hero"
                fill
                className="object-contain opacity-25"
              />
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-l from-black-3 via-black-3/40 to-transparent opacity-90" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black-3 via-black-3/70 to-transparent" />
          <div className="absolute right-6 bottom-6 hidden md:block opacity-40">
            <Image
              src="/icons/logo.svg"
              alt="AuroraCast emblem"
              width={180}
              height={180}
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
        <div className="relative z-10 flex max-w-2xl flex-col gap-4 md:max-w-[520px]">
          <span className="flex items-center gap-2 text-12 uppercase tracking-[0.36em] text-white-4">
            <Sparkles className="h-4 w-4" /> AuroraCast spotlight
          </span>
          <h1 className="text-32 font-semibold leading-tight text-white-1">
            {heroPodcast
              ? heroPodcast.podcastTitle
              : "Compose immersive narratives with AI-native tooling."}
          </h1>
          <p className="text-16 text-white-4">
            {heroPodcast
              ? heroPodcast.podcastDescription
              : "From concept to release, AuroraCast stitches together prompts, voice models, and sonic atmospheres into one creative flow."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="bg-orange-1 px-6 py-5 text-16 font-semibold text-white-1">
              <Link href="/create-podcast">
                Start a session <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border border-black-6/60 bg-transparent px-6 py-5 text-16 font-semibold text-white-1/80 hover:bg-black-2"
            >
              <Link href="/discover">Browse the library</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-12 uppercase tracking-[0.3em] text-white-4">
              Trending momentum
            </p>
            <h2 className="text-20 font-semibold text-white-1">
              Stories shaping the week
            </h2>
          </div>
          <Link
            href="/discover"
            className="text-14 font-semibold text-orange-1"
          >
            View discover feed
          </Link>
        </header>
        <div className="podcast_grid">
          {trendingPodcasts?.slice(0, 6).map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl || "/icons/emptyState.svg"}
              title={podcast.podcastTitle}
              description={podcast.podcastDescription}
              podcastId={podcast._id}
              badge={`${podcast.views.toLocaleString()} plays`}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <header className="flex items-center gap-2 text-14 font-semibold text-white-4">
          <Flame className="h-4 w-4 text-orange-1" /> Fresh uploads
        </header>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentPodcasts && recentPodcasts.length > 0 ? recentPodcasts.map((podcast) => {
            const durationMinutes = Math.max(
              1,
              Math.round((podcast.audioDuration ?? 0) / 60)
            );

            return (
              <Link
                key={podcast._id}
                href={`/podcasts/${podcast._id}`}
                className="group flex flex-col gap-3 rounded-3xl border border-black-6/50 bg-black-2/60 p-5 transition-all hover:border-orange-1/60 hover:bg-black-1/70"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={podcast.imageUrl || "/icons/emptyState.svg"}
                    alt={podcast.podcastTitle}
                    width={64}
                    height={64}
                    className="size-16 rounded-2xl object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-16 font-semibold text-white-1 group-hover:text-orange-1">
                      {podcast.podcastTitle}
                    </p>
                    <span className="text-12 text-white-4">
                      {podcast.author} · {durationMinutes} min
                    </span>
                  </div>
                </div>
                <p className="line-clamp-2 text-14 text-white-4">
                  {podcast.podcastDescription}
                </p>
              </Link>
            );
          }) : (
            <p className="text-14 text-white-4">
              No recent uploads yet. Generate a story to light up this feed.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-12 uppercase tracking-[0.3em] text-white-4">
              Voice textures
            </p>
            <h2 className="text-20 font-semibold text-white-1">
              AI voices with standout sessions
            </h2>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {voiceHighlights && voiceHighlights.length > 0 ? voiceHighlights.map(({ voiceType, podcast }) => (
            <Link
              key={voiceType}
              href={`/podcasts/${podcast._id}`}
              className="group flex flex-col gap-4 rounded-3xl border border-black-6/50 bg-black-1/70 p-5 transition-colors hover:border-teal-1/60"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal-1/20 px-3 py-1 text-12 font-semibold uppercase tracking-widest text-teal-1">
                  {voiceType}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={podcast.imageUrl || "/icons/emptyState.svg"}
                  alt={podcast.podcastTitle}
                  width={80}
                  height={80}
                  className="size-20 rounded-2xl object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-16 font-semibold text-white-1 group-hover:text-teal-1">
                    {podcast.podcastTitle}
                  </p>
                  <span className="text-12 text-white-4">
                    {podcast.author} · {podcast.views.toLocaleString()} plays
                  </span>
                </div>
              </div>
              <p className="line-clamp-2 text-14 text-white-4">
                {podcast.podcastDescription}
              </p>
            </Link>
          )) : (
            <p className="text-14 text-white-4">
              Experiment with different AI voices to curate your own texture board.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
