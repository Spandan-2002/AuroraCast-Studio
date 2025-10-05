import CreatorToolbar from "@/components/CreatorToolbar";
import InsightsPanel from "@/components/InsightsPanel";
import PodcastPlayer from "@/components/PodcastPlayer";
import { Toaster } from "@/components/ui/toaster";
import MainHeader from "@/components/MainHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-black-3 text-white-1">
      <MainHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 pb-36 pt-8 sm:px-6 lg:px-10">
        <Toaster />
        <CreatorToolbar />
        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="flex min-w-0 flex-[2] flex-col gap-8">
            {children}
          </div>
          <InsightsPanel />
        </section>
      </main>
      <PodcastPlayer />
    </div>
  );
}
