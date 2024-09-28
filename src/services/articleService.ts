"use server";

import { shuffleArray } from "@/lib/utils";
import { getGuardianApiArticles } from "@/services/guardianApiService";
import { getNewYorkTimesApiArticles } from "@/services/newYorkTimesApiService";
import { getNewsApiArticles } from "@/services/newsApiService";
import { NewsSources } from "@/types/enums";

const apiServices = {
  [NewsSources.NewsAPI]: getNewsApiArticles,
  [NewsSources.Guardian]: getGuardianApiArticles,
  [NewsSources.NewYorkTimes]: getNewYorkTimesApiArticles,
};

const processApiResult = (result: PromiseSettledResult<ArticleAPIResponse>) => {
  if (result.status === "fulfilled" && result.value) {
    return {
      articles: result.value.data || [],
      totalPages: result.value.totalPages || 1,
      error: result.value.error,
    };
  }
  return {
    articles: [],
    totalPages: 0,
    error: result.status === "rejected" ? result.reason : undefined,
  };
};

export const getArticles = async (searchParams: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  newsSource?: string;
  category?: string;
}) => {
  const { newsSource, category, ...otherSearchParams } = searchParams;

  if (!newsSource) {
    const results = await Promise.allSettled(
      Object.values(apiServices).map((service) =>
        service({ categories: category, ...otherSearchParams })
      )
    );

    const processedResults = results.map(processApiResult);

    const articles = shuffleArray(processedResults.flatMap((r) => r.articles));
    const totalPages = Math.max(
      ...processedResults.map((r) => r.totalPages),
      1
    );
    const errors = processedResults.map((r) => r.error).filter(Boolean);

    return {
      articles,
      totalPages,
      error: errors.length > 0 ? errors.join("\n") : undefined,
    };
  } else {
    const service =
      apiServices[newsSource as NewsSources] ||
      apiServices[NewsSources.NewsAPI];
    const result = await service({
      categories: category,
      ...otherSearchParams,
    });
    return processApiResult({ status: "fulfilled", value: result });
  }
};
