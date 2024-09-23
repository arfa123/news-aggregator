"use server";

import { guardianApiClient } from "@/lib/api-clients/guardianApiClient";
import { DEFAULT_PAGE, PAGE_SIZE } from "@/lib/constants";

const GuardianAPIResponseFormat = "json";
const GuardianAPIShowFields = "headline,thumbnail,short-url,trailText";

export const getGuardianApiArticles = async ({
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
  category?: string;
}) => {
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
        q: keyword,
        "query-fields": "body, body,thumbnail",
        "form-date": fromDate,
        "to-date": toDate,
        section: category,
      },
    });

    return {
      data:
        response.data?.response.results.map(({ fields }) => ({
          title: fields.headline,
          description: fields.trailText,
          imageUrl: fields.thumbnail,
          source: "Guardian",
          url: fields.shortUrl,
        })) || [],
      totalPages: response.data.response.pages,
    };
  } catch (e) {
    console.error(e);
  }
};
