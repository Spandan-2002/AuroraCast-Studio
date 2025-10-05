"use client"

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import Searchbar from "@/components/Searchbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

type DiscoverProps = {
  searchParams: { search?: string } | Promise<{ search?: string }>;
};

const resolveSearchParams = (searchParams: DiscoverProps["searchParams"]) => {
  if (searchParams instanceof Promise) {
    return searchParams;
  }
  return Promise.resolve(searchParams);
};

const Discover = ({ searchParams }: DiscoverProps) => {
  const paramsPromise = React.useMemo(() => resolveSearchParams(searchParams), [searchParams]);
  const resolvedParams = React.use(paramsPromise);
  const searchValue = resolvedParams?.search ?? "";
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: searchValue });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!searchValue ? "Discover Trending Podcasts" : "Search results for "}
          {searchValue && <span className="text-white-2">{searchValue}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
              {podcastsData?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard 
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              ))}
            </div>
            ) : <EmptyState title="No results found" />}
          </>
        ) : <LoaderSpinner />}
      </div>
    </div>
  )
}

export default Discover
