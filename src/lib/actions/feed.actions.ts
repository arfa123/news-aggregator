"use server";

import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { NewsSources } from "@/lib/enums";
import { shuffleArray } from "@/lib/utils";

export const getFeedArticles = async (searchParams: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  newsSource?: string;
  category?: string;
}) => {
  const { newsSource } = searchParams;

  if (!newsSource) {
    const [newsApiArticles, guardianApiArticles, newYorkTimesApiArticles] =
      await Promise.all([
        getNewsApiArticles(searchParams),
        getGuardianApiArticles(searchParams),
        getNewYorkTimesApiArticles(searchParams),
      ]);

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

    return {
      articles,
      totalPages,
    };
  } else {
    switch (newsSource) {
      case NewsSources.NewsAPI:
      default:
        const newsApiArticles = await getNewsApiArticles(searchParams);

        return {
          articles: newsApiArticles?.data || [],
          totalPages: newsApiArticles?.totalPages || 1,
        };

      case NewsSources.Guardian:
        const guardianApiArticles = await getGuardianApiArticles(searchParams);

        return {
          articles: guardianApiArticles?.data || [],
          totalPages: guardianApiArticles?.totalPages || 1,
        };

      case NewsSources.NewYorkTimes:
        const newYorkTimesApiArticles =
          await getNewYorkTimesApiArticles(searchParams);

        return {
          articles: newYorkTimesApiArticles?.data || [],
          totalPages: newYorkTimesApiArticles?.totalPages || 1,
        };
    }
  }
};
