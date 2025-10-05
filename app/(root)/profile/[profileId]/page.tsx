"use client";

import React from "react";
import { useQuery } from "convex/react";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";

type ProfilePageProps = {
  params: Promise<{ profileId: string }> | { profileId: string };
};

const resolveParams = (params: ProfilePageProps["params"]) => {
  if (params instanceof Promise) {
    return params;
  }
  return Promise.resolve(params);
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  const paramsPromise = React.useMemo(() => resolveParams(params), [params]);
  const { profileId } = React.use(paramsPromise);

  const user = useQuery(
    api.users.getUserById,
    profileId ? { clerkId: profileId } : "skip"
  );
  const podcastsData = useQuery(
    api.podcasts.getPodcastByAuthorId,
    profileId ? { authorId: profileId } : "skip"
  );

  if (user === undefined || podcastsData === undefined) {
    return <LoaderSpinner />;
  }

  if (!user) {
    return (
      <EmptyState
        title="Creator not found"
        buttonLink="/discover"
        buttonText="Explore shows"
      />
    );
  }

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastData={podcastsData}
          imageUrl={user.imageUrl || "/icons/avatar.svg"}
          userFirstName={user.name}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData.podcasts.slice(0, 4).map((podcast) => (
              <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl || "/icons/emptyState.svg"}
                title={podcast.podcastTitle}
                description={podcast.podcastDescription}
                podcastId={podcast._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
