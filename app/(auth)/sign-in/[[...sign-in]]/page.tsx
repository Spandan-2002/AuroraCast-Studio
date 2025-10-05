import { SignIn } from "@clerk/nextjs";
import React from "react";

import { auroraClerkAppearance } from "@/lib/clerkAppearance";

type SignInPageProps = {
  searchParams: Promise<{ redirect_url?: string }> | { redirect_url?: string };
};

const resolveSearchParams = (searchParams: SignInPageProps["searchParams"]) => {
  if (searchParams instanceof Promise) return searchParams;
  return Promise.resolve(searchParams);
};

const Page = ({ searchParams }: SignInPageProps) => {
  const paramsPromise = React.useMemo(() => resolveSearchParams(searchParams), [searchParams]);
  const params = React.use(paramsPromise);
  const redirectUrl = params?.redirect_url ?? "/";

  return (
    <div className="flex-center glassmorphism-auth h-screen w-full px-4">
      <SignIn
        appearance={auroraClerkAppearance}
        afterSignInUrl={redirectUrl}
        redirectUrl={redirectUrl}
      />
    </div>
  );
};

export default Page;
