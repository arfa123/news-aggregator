"use server";

import { newsApiClient } from "@/lib/api";
import { NewsAPISources } from "@/lib/enums/news.enums";
import { NewsAPIArticle } from "@/lib/types/news";

export const getArticles = async ({
  page,
  sources,
}: {
  page: string;
  sources?: NewsAPISources;
}) => {
  try {
    const response = await newsApiClient.get<{
      status: string;
      totalResults: number;
      articles: NewsAPIArticle[];
    }>("/everything", {
      params: {
        page: page || "1",
        sources: sources || NewsAPISources.BBC_NEWS,
        pageSize: 10,
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
