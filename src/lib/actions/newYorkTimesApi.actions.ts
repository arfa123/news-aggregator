"use server";

import { newYorkTimesApiClient } from "@/lib/api-clients/newYorkTimesApiClient";

export const getNewYorkTimesApiArticles = async ({
  page,
}: {
  page: string;
}) => {
  try {
    const response = await newYorkTimesApiClient.get<{
      status: string;
      copyright: string;
      response: {
        docs: NewYorkTimesAPIArticle[];
        meta: {
          hits: number;
          offset: number;
          time: number;
        };
      };
    }>("/articlesearch.json", {
      params: {
        page: page || "1",
      },
    });

    return response.data.response;
  } catch (e) {
    console.error(e);
  }
};
