import type { Metadata } from "next";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "../providers/AudioProvider";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "AuroraCast Studio",
  description: "Create, refine, and publish immersive audio stories with AI-native workflows.",
  icons: {
    icon: '/icons/logo.svg',
  }
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>
            {children}
          </body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
