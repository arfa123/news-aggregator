"use server";

import { randomUUID } from "crypto";

import { guardianApiClient } from "@/lib/api-clients/guardianApiClient";
import { DEFAULT_PAGE, PAGE_SIZE } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";

const GuardianAPIResponseFormat = "json";
const GuardianAPIShowFields =
  "headline,thumbnail,short-url,trailText,publication,body,byline";

export const getGuardianApiArticles = async ({
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
  category?: string;
  authors?: string[];
}) => {
  let query = keyword;

  if (authors) {
    const author = authors.join(" OR ");
    if (query) query += ` OR ${author}`;
    else query = author;
  }

  try {
    const response = await guardianApiClient.get<{
      response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        orderBy: string;
        results: GuardianAPIArticle[];
      };
    }>("/search", {
      params: {
        page: page || DEFAULT_PAGE,
        "page-size": PAGE_SIZE,
        format: GuardianAPIResponseFormat,
        "show-fields": GuardianAPIShowFields,
        q: query,
        "form-date": fromDate,
        "to-date": toDate,
        section: category,
      },
    });

    return {
      data:
        response.data?.response.results.map(
          ({ fields, webPublicationDate, sectionName }) => ({
            id: randomUUID(),
            title: fields.headline,
            description: fields.trailText,
            imageUrl: fields.thumbnail,
            source: fields.publication,
            url: fields.shortUrl,
            date: webPublicationDate,
            category: sectionName,
            content: fields.body,
            author: fields.byline,
          })
        ) || [],
      totalPages: response.data.response.pages,
    };
  } catch (error) {
    console.error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};
