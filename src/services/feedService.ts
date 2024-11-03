"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";

import { shuffleArray } from "@/lib/utils";
import { getGuardianApiArticles } from "@/services/guardianApiService";
import { getNewYorkTimesApiArticles } from "@/services/newYorkTimesApiService";
import { getNewsApiArticles } from "@/services/newsApiService";
import { CookiesKeys, NewsSources, Paths } from "@/types/enums";

type FeedParams = {
  page?: string;
  newsSources?: string[];
  categories?: string[];
  authors?: string[];
};

const apiServices = {
  [NewsSources.NewsAPI]: getNewsApiArticles,
  [NewsSources.Guardian]: (params: FeedParams) =>
    params.categories && params.categories.length > 0
      ? getGuardianArticlesForCategories(params)
      : getGuardianApiArticles(params),
  [NewsSources.NewYorkTimes]: getNewYorkTimesApiArticles,
};

export const setPersonalizedFeedPreferences = async (
  personalizedNewsFeed: string
) => {
  const cookieStore = await cookies();
  cookieStore.set(
    CookiesKeys.personalizedNewsFeedPreferences,
    personalizedNewsFeed,
    { httpOnly: true, path: Paths.home }
  );
  redirect(Paths.feed);
};

const getGuardianArticlesForCategories = async ({
  categories,
  authors,
  page,
}: Omit<FeedParams, "newsSources">) => {
  const results = await Promise.allSettled(
    categories!.map((category) =>
      getGuardianApiArticles({
        categories: category,
        authors,
        page,
      })
    )
  );

  const successfulResults = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const combinedData = successfulResults.reduce(
    (acc, result) => ({
      data: [...(acc?.data || []), ...(result?.data || [])],
      totalPages: Math.max(acc?.totalPages || 0, result?.totalPages || 0),
    }),
    { data: [] as Article[], totalPages: 0 }
  );

  const allFailed = results.every((result) => result.status === "rejected");
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason);

  return {
    ...combinedData,
    error: allFailed ? errors[0] : undefined,
  };
};

export const getFeedArticles = async (params: FeedParams) => {
  const {
    newsSources = Object.values(NewsSources),
    categories,
    authors,
    page,
  } = params;

  const results = await Promise.all(
    newsSources.map(async (source) => {
      const service = apiServices[source as NewsSources];
      return service ? await service({ categories, authors, page }) : null;
    })
  );

  const articles = shuffleArray(
    results.flatMap((result) => result?.data || [])
  );

  const totalPages = Math.max(
    ...results.map((result) => result?.totalPages || 0),
    1
  );

  const errors = results
    .map((result) => result?.error)
    .filter((error): error is string => !!error);

  return {
    articles,
    totalPages,
    error: errors.length > 0 ? errors.join("\n") : undefined,
  };
};
