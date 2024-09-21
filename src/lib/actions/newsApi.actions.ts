"use server";

import { newsApiClient } from "@/lib/api-clients/newsApiClient";
import { NewsAPISources } from "@/lib/enums/news.enums";

export const getNewsApiArticles = async ({ page }: { page: string }) => {
  try {
    const response = await newsApiClient.get<{
      status: string;
      totalResults: number;
      articles: NewsAPIArticle[];
    }>("/everything", {
      params: {
        page: page || "1",
        sources: `${NewsAPISources.BBC_NEWS}, ${NewsAPISources.ABC_NEWS}, ${NewsAPISources.BLOOMBERG}`,
        pageSize: 10,
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
