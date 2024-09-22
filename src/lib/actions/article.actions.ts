"use server";

import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { NewsSources } from "@/lib/enums/news.enums";
import { shuffleArray } from "@/lib/utils";

export const getArticles = async ({
  page = "1",
  keyword,
  fromDate,
  toDate,
  newsSource,
}: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  newsSource?: string;
}) => {
  if (!newsSource) {
    const [newsApiArticles, guardianApiArticles, newYorkTimesApiArticles] =
      await Promise.all([
        getNewsApiArticles({ page, keyword, fromDate, toDate }),
        getGuardianApiArticles({ page, keyword, fromDate, toDate }),
        getNewYorkTimesApiArticles({ page, keyword, fromDate, toDate }),
      ]);

    const articles = shuffleArray([
      ...(newsApiArticles?.data || []),
      ...(guardianApiArticles?.data || []),
      ...(newYorkTimesApiArticles?.data || []),
    ]);

    const totalPages =
      Math.max(
        newsApiArticles?.totalPages || 0,
        guardianApiArticles?.totalPages || 0
      ) || 1;

    return {
      articles,
      totalPages,
    };
  } else {
    switch (newsSource) {
      case NewsSources.NewsAPI:
      default:
        const newsApiArticles = await getNewsApiArticles({
          page,
          keyword,
          fromDate,
          toDate,
        });

        return {
          articles: newsApiArticles?.data || [],
          totalPages: newsApiArticles?.totalPages || 1,
        };

      case NewsSources.Guardian:
        const guardianApiArticles = await getGuardianApiArticles({
          page,
          keyword,
          fromDate,
          toDate,
        });

        return {
          articles: guardianApiArticles?.data || [],
          totalPages: guardianApiArticles?.totalPages || 1,
        };

      case NewsSources.NewYorkTimes:
        const newYorkTimesApiArticles = await getNewYorkTimesApiArticles({
          page,
          keyword,
          fromDate,
          toDate,
        });

        return {
          articles: newYorkTimesApiArticles?.data || [],
          totalPages: newYorkTimesApiArticles?.totalPages || 1,
        };
    }
  }
};
