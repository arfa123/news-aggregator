"use server";

import { newsApiClient } from "@/lib/api-clients/newsApiClient";

export const getNewsApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
}: {
  page: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  try {
    const response = await newsApiClient.get<{
      status: string;
      totalResults: number;
      articles: NewsAPIArticle[];
    }>("/everything", {
      params: {
        page: page || "1",
        sources: "bbc-news, new-york-magazine, bloomberg, abc-news",
        pageSize: 10,
        q: keyword,
        from: fromDate,
        to: toDate,
      },
    });

    return {
      data:
        response?.data?.articles.map(
          ({ title, description, urlToImage, source, url }) => ({
            title,
            description,
            imageUrl: urlToImage,
            source: source.name,
            url,
          })
        ) || [],
      totalPages: response.data.totalResults,
    };
  } catch (e) {
    console.error(e);
  }
};
