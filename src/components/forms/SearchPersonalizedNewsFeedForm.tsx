"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_PAGE } from "@/config/constants";
import { PageSearchParams, Paths } from "@/types/enums";

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
        !searchParams.has(PageSearchParams.newsSource) &&
        !searchParams.has(PageSearchParams.category) &&
        !searchParams.has(PageSearchParams.authors)
      ) {
        const params = new URLSearchParams(personalizedNewsFeedPreferences);

        params.set(PageSearchParams.page, `${DEFAULT_PAGE}`);

        replace(`${pathname}?${params.toString()}`);
      }
    } else {
      replace(Paths.settings);
    }
  }, [pathname, personalizedNewsFeedPreferences, replace, searchParams]);

  return null;
};

export default SearchPersonalizedNewsFeedForm;
