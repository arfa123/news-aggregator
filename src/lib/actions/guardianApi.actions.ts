"use server";

import { guardianApiClient } from "@/lib/api-clients/guardianApiClient";

export const getGuardianApiArticles = async ({ page }: { page: string }) => {
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
      },
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
