"use server";

import { getGuardianApiArticles } from "@/lib/actions/guardianApi.actions";
import { getNewYorkTimesApiArticles } from "@/lib/actions/newYorkTimesApi.actions";
import { getNewsApiArticles } from "@/lib/actions/newsApi.actions";
import { NewsSources } from "@/lib/enums";
import { ArticleAPIResponse } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";

export const getFeedArticles = async (searchParams: {
  page?: string;
  newsSources?: string[];
  categories?: string[];
  authors?: string[];
}) => {
  const { newsSources, categories, page } = searchParams;

  let newsApiArticles: ArticleAPIResponse;
  let guardianApiArticles: ArticleAPIResponse;
  let newYorkTimesApiArticles: ArticleAPIResponse;

  if (newsSources?.includes(NewsSources.NewsAPI)) {
    newsApiArticles = await getNewsApiArticles({
      category: categories,
      page,
    });
  }

  if (newsSources?.includes(NewsSources.Guardian)) {
    guardianApiArticles = await getGuardianApiArticles({
      category: categories?.[0] || "",
      page,
    });
  }

  if (newsSources?.includes(NewsSources.NewYorkTimes)) {
    newYorkTimesApiArticles = await getNewYorkTimesApiArticles({
      category: categories,
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

  return {
    articles,
    totalPages,
  };
};
