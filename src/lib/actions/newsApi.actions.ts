"use server";

import { newsApiClient } from "@/lib/api-clients/newsApiClient";
import { DEFAULT_PAGE, PAGE_SIZE } from "@/lib/constants";

const NewsAPISources = "bbc-news, new-york-magazine, bloomberg, abc-news";

export const getNewsApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  category,
}: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  category?: string[] | string;
}) => {
  let query = keyword;

  if (category) {
    const categories = Array.isArray(category)
      ? category.join(" OR ")
      : category;
    if (query) query += ` OR ${categories}`;
    else query = categories;
  }

  try {
    const response = await newsApiClient.get<{
      status: string;
      totalResults: number;
      articles: NewsAPIArticle[];
    }>("/everything", {
      params: {
        page: page || DEFAULT_PAGE,
        sources: NewsAPISources,
        pageSize: PAGE_SIZE,
        q: query,
        from: fromDate,
        to: toDate,
      },
    });

    return {
      data:
        response?.data?.articles.map(
          ({ title, description, urlToImage, source, url, publishedAt }) => ({
            title,
            description,
            imageUrl: urlToImage,
            source: source.name,
            url,
            date: publishedAt,
            category: "",
          })
        ) || [],
      totalPages: response.data.totalResults,
    };
  } catch (e) {
    console.error(e);
  }
};
