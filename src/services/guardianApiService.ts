"use server";

import { unstable_cacheLife as cacheLife } from "next/cache";

import { randomUUID } from "crypto";

import {
  CATEGORY_TO_GUARDIAN_API_CATEGORY_MAPPING,
  DEFAULT_PAGE,
  PAGE_SIZE,
} from "@/config/constants";
import { guardianApiClient } from "@/lib/api-clients/guardianApiClient";
import { getErrorMessage } from "@/lib/utils";
import { Categories } from "@/types/enums";

const GuardianAPIResponseFormat = "json";
const GuardianAPIShowFields =
  "headline,thumbnail,short-url,trailText,publication,body,byline";

export const getGuardianApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  categories,
  authors,
}: ArticleAPIParams) => {
  "use cache";
  cacheLife("minutes");

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
        section: categories
          ? CATEGORY_TO_GUARDIAN_API_CATEGORY_MAPPING[
              categories as Categories
            ] || categories
          : categories,
      },
    });

    return {
      data:
        response?.response.results.map(
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
      totalPages: response.response.pages,
    };
  } catch (error) {
    console.error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};
