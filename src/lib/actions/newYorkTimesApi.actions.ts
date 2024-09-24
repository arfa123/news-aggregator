"use server";

import { newYorkTimesApiClient } from "@/lib/api-clients/newYorkTimesApiClient";
import { DEFAULT_PAGE, PAGE_SIZE } from "@/lib/constants";

const NEW_YORK_TIMES_IMAGES_BASE_URL =
  process.env.NEW_YORK_TIMES_IMAGES_BASE_URL;

export const getNewYorkTimesApiArticles = async ({
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
        page: Number(page) - 1 || DEFAULT_PAGE - 1,
        q: keyword,
        begin_date: fromDate?.replaceAll("-", ""),
        end_date: toDate?.replaceAll("-", ""),
        fq: category
          ? `section_name:(${Array.isArray(category) ? category.map((c) => `"${c}"`).join(", ") : category})`
          : undefined,
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
      totalPages: Math.ceil(response.data.response.meta.hits / PAGE_SIZE),
    };
  } catch (e) {
    console.error(e);
  }
};
