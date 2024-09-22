"use server";

import { guardianApiClient } from "@/lib/api-clients/guardianApiClient";

export const getGuardianApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  category,
}: {
  page: string;
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
        page: page || "1",
        "page-size": 10,
        format: "json",
        "show-fields": "headline,thumbnail,short-url,trailText",
        q: keyword,
        "form-date": fromDate,
        "to-date": toDate,
        section: category,
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
