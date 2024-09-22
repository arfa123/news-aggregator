"use server";

import { newYorkTimesApiClient } from "@/lib/api-clients/newYorkTimesApiClient";

const NEW_YORK_TIMES_IMAGES_BASE_URL =
  process.env.NEW_YORK_TIMES_IMAGES_BASE_URL;

export const getNewYorkTimesApiArticles = async ({
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
        q: keyword,
        begin_date: fromDate,
        end_date: toDate,
      },
    });

    return {
      data:
        response?.data?.response?.docs.map(
          ({ web_url, headline, abstract, source, multimedia }) => ({
            title: headline.main,
            description: abstract,
            imageUrl: `${NEW_YORK_TIMES_IMAGES_BASE_URL}${multimedia?.[0]?.url}`,
            source,
            url: web_url,
          })
        ) || [],
      totalPages: response.data.response.meta.hits,
    };
  } catch (e) {
    console.error(e);
  }
};
