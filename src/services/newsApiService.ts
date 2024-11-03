"use server";

import { randomUUID } from "crypto";
import "server-only";

import {
  DEFAULT_PAGE,
  FETCH_REVALIDATE_INTERVAL,
  PAGE_SIZE,
} from "@/config/constants";
import { newsApiClient } from "@/lib/api-clients/newsApiClient";
import { getErrorMessage } from "@/lib/utils";

const NewsAPISources = "bbc-news,new-york-magazine,bloomberg,abc-news";

export const getNewsApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  categories,
  authors,
}: ArticleAPIParams) => {
  let query = keyword;

  if (categories) {
    const categoriesQuery = Array.isArray(categories)
      ? categories.join(" OR ")
      : categories;
    if (query) query += ` OR ${categoriesQuery}`;
    else query = categoriesQuery;
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
      next: { revalidate: FETCH_REVALIDATE_INTERVAL },
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
        response?.articles.map(
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
            category: source.id,
            content,
            author,
          })
        ) || [],
      totalPages: response.totalResults,
    };
  } catch (error) {
    console.error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};
