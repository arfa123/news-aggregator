"use server";

import { DEFAULT_PAGE, PAGE_SIZE } from "@/config/constants";
import { newYorkTimesApiClient } from "@/lib/api-clients/newYorkTimesApiClient";
import { getErrorMessage } from "@/lib/utils";

const NEW_YORK_TIMES_IMAGES_BASE_URL =
  process.env.NEW_YORK_TIMES_IMAGES_BASE_URL;

export const getNewYorkTimesApiArticles = async ({
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
  const fq: string[] = [];

  if (category) {
    fq.push(
      `section_name:(${Array.isArray(category) ? category.map((c) => `"${c}"`).join(", ") : category})`
    );
  }

  if (authors) {
    fq.push(
      `persons:(${Array.isArray(authors) ? authors.map((c) => `"${c}"`).join(", ") : authors})`
    );
  }

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
        fq: fq.length > 0 ? fq.join(" OR ") : undefined,
      },
    });

    return {
      data:
        response?.data?.response?.docs.map(
          ({
            _id,
            web_url,
            headline,
            abstract,
            source,
            multimedia,
            pub_date,
            section_name,
            snippet,
            byline,
            lead_paragraph,
          }) => ({
            id: _id,
            title: headline.main,
            description: snippet || abstract,
            imageUrl: `${NEW_YORK_TIMES_IMAGES_BASE_URL}${multimedia?.[0]?.url}`,
            source,
            url: web_url,
            date: pub_date,
            category: section_name,
            content: createArticleContent({ abstract, lead_paragraph }),
            author: byline.original,
          })
        ) || [],
      totalPages: Math.ceil(response.data.response.meta.hits / PAGE_SIZE),
    };
  } catch (error) {
    console.error(error);
    return {
      error: getErrorMessage(error),
    };
  }
};

function createArticleContent({
  abstract = "",
  lead_paragraph,
}: {
  abstract: string;
  lead_paragraph: string;
}): string {
  const leadParagraph = lead_paragraph || "";

  if (abstract === leadParagraph) {
    return abstract;
  } else {
    return `${abstract}\n\n${leadParagraph}`.trim();
  }
}
