"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { CookiesKeys, NewsSources } from "@/lib/enums";
import { ArticleAPIResponse } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";

export const setPersonalizedFeedPrefrences = async (
  personalizedNewsFeed: string
) => {
  cookies().set(
    CookiesKeys.personalizedNewsFeedPreferences,
    personalizedNewsFeed,
    { httpOnly: true, path: "/" }
  );
  redirect("/feed");
};

const getGuardianArticlesForCategories = async ({
  categories,
  authors,
  page,
}: {
  categories: string[];
  authors?: string[];
  page?: string;
}) => {
  const results = await Promise.allSettled(
    categories.map((category) =>
      getGuardianApiArticles({
        category,
        authors,
        page,
      })
    )
  );

  // Filter out fulfilled results
  const successfulResults = results
    .filter((result) => result.status === "fulfilled" && result)
    .map(
      (result) => (result as PromiseFulfilledResult<ArticleAPIResponse>).value
    );

  // Combine data and totalPages from successful results
  const combinedData = successfulResults.reduce(
    (acc = { data: [], totalPages: 0 }, result) => {
      if (result?.data) {
        acc.data = [...(acc.data || []), ...result.data];
      }
      acc.totalPages = Math.max(acc.totalPages || 0, result?.totalPages || 0);
      return acc;
    },
    { data: [], totalPages: 0 }
  );

  // Check if all promises were rejected
  const allFailed = results.every((result) => result.status === "rejected");
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => (result as PromiseRejectedResult).reason);

  return {
    data: combinedData?.data,
    totalPages: combinedData?.totalPages,
    error: allFailed ? errors[0] : undefined, // Only set error if all API calls failed
  };
};

export const getFeedArticles = async (searchParams: {
  page?: string;
  newsSources?: string[];
  categories?: string[];
  authors?: string[];
}) => {
  const { newsSources, categories, authors, page } = searchParams;

  let newsApiArticles: ArticleAPIResponse;
  let guardianApiArticles: ArticleAPIResponse;
  let newYorkTimesApiArticles: ArticleAPIResponse;

  if (newsSources?.includes(NewsSources.NewsAPI) || !newsSources) {
    newsApiArticles = await getNewsApiArticles({
      category: categories,
      authors,
      page,
    });
  }

  if (newsSources?.includes(NewsSources.Guardian) || !newsSources) {
    guardianApiArticles =
      categories && categories?.length > 0
        ? await getGuardianArticlesForCategories({
            categories,
            authors,
            page,
          })
        : await getGuardianApiArticles({
            authors,
            page,
          });
  }

  if (newsSources?.includes(NewsSources.NewYorkTimes) || !newsSources) {
    newYorkTimesApiArticles = await getNewYorkTimesApiArticles({
      category: categories,
      authors,
      page,
    });
  }

  const articles = shuffleArray([
    ...(newsApiArticles?.data || []),
    ...(guardianApiArticles?.data || []),
    ...(newYorkTimesApiArticles?.data || []),
  ]);

  const totalPages =
    Math.max(
      newsApiArticles?.totalPages || 0,
      guardianApiArticles?.totalPages || 0,
      newYorkTimesApiArticles?.totalPages || 0
    ) || 1;

  const errors: string[] = [];

  if (newsApiArticles?.error) errors.push(newsApiArticles.error);
  if (guardianApiArticles?.error) errors.push(guardianApiArticles.error);
  if (newYorkTimesApiArticles?.error)
    errors.push(newYorkTimesApiArticles.error);

  return {
    articles,
    totalPages,
    error: errors.join("\n"),
  };
};
