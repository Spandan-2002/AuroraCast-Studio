import { PodcastCardProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PodcastCard = ({ imgUrl, title, description, podcastId, badge }: PodcastCardProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  return (
    <article
      onClick={handleNavigation}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-black-6/60 bg-black-2/60 shadow-[0_24px_50px_rgba(10,12,29,0.35)] transition-all hover:-translate-y-1 hover:border-orange-1/70 hover:bg-black-1/70"
    >
      <div className="relative">
        <Image
          src={imgUrl}
          width={360}
          height={360}
          alt={title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-orange-1/20 px-3 py-1 text-12 font-semibold uppercase tracking-widest text-orange-1">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 px-5 py-6">
        <h3 className="text-18 font-semibold text-white-1">
          {title}
        </h3>
        <p className="line-clamp-3 text-14 text-white-4">{description}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-12 font-semibold uppercase tracking-[0.28em] text-white-3">
          Listen now
          <span className="h-1 w-6 rounded-full bg-orange-1 transition-all group-hover:w-10" />
        </span>
      </div>
    </article>
  );
};

export default PodcastCard;
