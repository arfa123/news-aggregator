"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";

import { LocalStorageKeys, PersonalizedNewsFeedFormFields } from "@/lib/enums";
import { PersonalizedNewsFeedFormSchema } from "@/lib/schemas";

type PersonalizedNewsFeed = z.infer<typeof PersonalizedNewsFeedFormSchema>;

const SearchPersonalizedNewsFeedForm = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const personalizedNewsFeedPreferences = localStorage.getItem(
      LocalStorageKeys.personalizedNewsFeedPreferences
    );

    if (!personalizedNewsFeedPreferences) {
      replace("/settings");
    }

    if (personalizedNewsFeedPreferences) {
      const personalizedNewsFeed: PersonalizedNewsFeed = JSON.parse(
        personalizedNewsFeedPreferences
      );
      const params = new URLSearchParams(searchParams);

      if (
        personalizedNewsFeed[
          PersonalizedNewsFeedFormFields.preferredNewsSources
        ]
      ) {
        params.set(
          "newsSource",
          personalizedNewsFeed[
            PersonalizedNewsFeedFormFields.preferredNewsSources
          ].join(",")
        );
      } else params.delete("newsSource");

      if (
        personalizedNewsFeed[PersonalizedNewsFeedFormFields.preferredCategories]
      ) {
        params.set(
          "category",
          personalizedNewsFeed[
            PersonalizedNewsFeedFormFields.preferredCategories
          ].join(",")
        );
      } else params.delete("category");

      if (
        personalizedNewsFeed[PersonalizedNewsFeedFormFields.preferredAuthors]
      ) {
        params.set(
          "authors",
          personalizedNewsFeed[PersonalizedNewsFeedFormFields.preferredAuthors]
        );
      } else params.delete("authors");

      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, replace, searchParams]);

  return null;
};

export default SearchPersonalizedNewsFeedForm;
