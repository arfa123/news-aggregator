"use server";

import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { NewsSources } from "@/lib/enums";
import { shuffleArray } from "@/lib/utils";

export const getArticles = async (searchParams: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  newsSource?: string;
  category?: string;
}) => {
  const { newsSource } = searchParams;

  if (!newsSource) {
    const [newsAPIResult, guardianAPIResult, newYorkTimesAPIResult] =
      await Promise.allSettled([
        getNewsApiArticles(searchParams),
        getGuardianApiArticles(searchParams),
        getNewYorkTimesApiArticles(searchParams),
      ]);

    const newsApiArticles =
      newsAPIResult?.status === "fulfilled" && newsAPIResult?.value
        ? {
            data: newsAPIResult.value.data,
            totalPages: newsAPIResult.value.totalPages,
            error: newsAPIResult.value.error,
          }
        : {
            data: [],
            totalPages: 0,
            error:
              newsAPIResult.status === "rejected"
                ? newsAPIResult.reason
                : undefined,
          };
    const guardianApiArticles =
      guardianAPIResult?.status === "fulfilled" && guardianAPIResult?.value
        ? {
            data: guardianAPIResult.value.data,
            totalPages: guardianAPIResult.value.totalPages,
            error: guardianAPIResult.value.error,
          }
        : {
            data: [],
            totalPages: 0,
            error:
              guardianAPIResult.status === "rejected"
                ? guardianAPIResult.reason
                : undefined,
          };
    const newYorkTimesApiArticles =
      newYorkTimesAPIResult?.status === "fulfilled" &&
      newYorkTimesAPIResult?.value
        ? {
            data: newYorkTimesAPIResult.value.data,
            totalPages: newYorkTimesAPIResult.value.totalPages,
            error: newYorkTimesAPIResult.value.error,
          }
        : {
            data: [],
            totalPages: 0,
            error:
              newYorkTimesAPIResult.status === "rejected"
                ? newYorkTimesAPIResult.reason
                : undefined,
          };

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

    if (newsApiArticles.error) errors.push(newsApiArticles.error);
    if (guardianApiArticles.error) errors.push(guardianApiArticles.error);
    if (newYorkTimesApiArticles.error)
      errors.push(newYorkTimesApiArticles.error);

    return {
      articles,
      totalPages,
      error: errors.join("\n"),
    };
  } else {
    switch (newsSource) {
      case NewsSources.NewsAPI:
      default:
        const newsApiArticles = await getNewsApiArticles(searchParams);

        return {
          articles: newsApiArticles?.data || [],
          totalPages: newsApiArticles?.totalPages || 1,
          error: newsApiArticles?.error,
        };

      case NewsSources.Guardian:
        const guardianApiArticles = await getGuardianApiArticles(searchParams);

        return {
          articles: guardianApiArticles?.data || [],
          totalPages: guardianApiArticles?.totalPages || 1,
          error: guardianApiArticles?.error,
        };

      case NewsSources.NewYorkTimes:
        const newYorkTimesApiArticles =
          await getNewYorkTimesApiArticles(searchParams);

        return {
          articles: newYorkTimesApiArticles?.data || [],
          totalPages: newYorkTimesApiArticles?.totalPages || 1,
          error: newYorkTimesApiArticles?.error,
        };
    }
  }
};
