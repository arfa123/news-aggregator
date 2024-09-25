"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchPersonalizedNewsFeedForm = ({
  personalizedNewsFeedPreferences,
}: {
  personalizedNewsFeedPreferences?: string;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (personalizedNewsFeedPreferences) {
      if (
        !searchParams.has("newsSource") &&
        !searchParams.has("category") &&
        !searchParams.has("authors")
      ) {
        const params = new URLSearchParams(personalizedNewsFeedPreferences);

        params.set("page", "1");

        replace(`${pathname}?${params.toString()}`);
      }
    } else {
      replace("/settings");
    }
  }, [pathname, personalizedNewsFeedPreferences, replace, searchParams]);

  return null;
};

export default SearchPersonalizedNewsFeedForm;
