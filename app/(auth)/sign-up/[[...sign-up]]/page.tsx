import { SignUp } from "@clerk/nextjs";
import React from "react";

import { auroraClerkAppearance } from "@/lib/clerkAppearance";

type SignUpPageProps = {
  searchParams: Promise<{ redirect_url?: string }> | { redirect_url?: string };
};

const resolveSearchParams = (searchParams: SignUpPageProps["searchParams"]) => {
  if (searchParams instanceof Promise) return searchParams;
  return Promise.resolve(searchParams);
};

const Page = ({ searchParams }: SignUpPageProps) => {
  const paramsPromise = React.useMemo(() => resolveSearchParams(searchParams), [searchParams]);
  const params = React.use(paramsPromise);
  const redirectUrl = params?.redirect_url ?? "/";

  return (
    <div className="flex-center glassmorphism-auth h-screen w-full px-4">
      <SignUp
        appearance={auroraClerkAppearance}
        afterSignUpUrl={redirectUrl}
        redirectUrl={redirectUrl}
      />
    </div>
  );
};

export default Page;
