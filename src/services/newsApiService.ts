"use server";

import { randomUUID } from "crypto";

import { DEFAULT_PAGE, PAGE_SIZE } from "@/config/constants";
import { newsApiClient } from "@/lib/api-clients/newsApiClient";
import { getErrorMessage } from "@/lib/utils";

const NewsAPISources = "bbc-news,new-york-magazine,bloomberg,abc-news";

export const getNewsApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  category,
  authors,
}: {
  page?: string;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
  category?: string[] | string;
  authors?: string[];
}) => {
  let query = keyword;

  if (category) {
    const categories = Array.isArray(category)
      ? category.join(" OR ")
      : category;
    if (query) query += ` OR ${categories}`;
    else query = categories;
  }

  if (authors) {
    const author = authors.join(" OR ");
    if (query) query += ` OR ${author}`;
    else query = author;
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
          ({
            title,
            description,
            urlToImage,
            source,
            url,
            publishedAt,
            content,
            author,
          }) => ({
            id: randomUUID(),
            title,
            description,
            imageUrl: urlToImage,
            source: source.name,
            url,
            date: publishedAt,
            category: "",
            content,
            author,
          })
        ) || [],
      totalPages: response.data.totalResults,
    };
  } catch (error) {
    console.error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};
