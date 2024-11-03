import "server-only";

import {
  CATEGORY_TO_NEW_YORK_TIMES_API_CATEGORY_MAPPING,
  DEFAULT_PAGE,
  FETCH_REVALIDATE_INTERVAL,
  PAGE_SIZE,
} from "@/config/constants";
import { newYorkTimesApiClient } from "@/lib/api-clients/newYorkTimesApiClient";
import { getErrorMessage } from "@/lib/utils";
import { Categories } from "@/types/enums";

const NEW_YORK_TIMES_IMAGES_BASE_URL =
  process.env.NEW_YORK_TIMES_IMAGES_BASE_URL;

export const getNewYorkTimesApiArticles = async ({
  page,
  keyword,
  fromDate,
  toDate,
  categories,
  authors,
}: ArticleAPIParams) => {
  const fq: string[] = [];

  if (categories) {
    const fieldMap: {
      [key: string]: string[];
    } = {};

    const processCategory = (c: string) => {
      const mapping =
        CATEGORY_TO_NEW_YORK_TIMES_API_CATEGORY_MAPPING[c as Categories];
      if (!mapping) return;

      if (!fieldMap[mapping.fieldName]) {
        fieldMap[mapping.fieldName] = [];
      }
      fieldMap[mapping.fieldName].push(`"${mapping.value}"`);
    };

    if (Array.isArray(categories)) {
      categories.forEach(processCategory);
    } else {
      processCategory(categories);
    }

    const categoryQuerires = Object.entries(fieldMap).map(
      ([fieldName, values]) => `${fieldName}:(${values.join(", ")})`
    );

    fq.push(...categoryQuerires);
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
      next: { revalidate: FETCH_REVALIDATE_INTERVAL },
      params: {
        page: `${Number(page) - 1 || +DEFAULT_PAGE - 1}`,
        q: keyword,
        begin_date: fromDate?.replaceAll("-", ""),
        end_date: toDate?.replaceAll("-", ""),
        fq: fq.length > 0 ? fq.join(" OR ") : undefined,
      },
    });

    return {
      data:
        response?.response?.docs.map(
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
            imageUrl: multimedia?.[0]?.url
              ? `${NEW_YORK_TIMES_IMAGES_BASE_URL}${multimedia?.[0]?.url}`
              : "",
            source,
            url: web_url,
            date: pub_date,
            category: section_name,
            content: createArticleContent({ abstract, lead_paragraph }),
            author: byline.original,
          })
        ) || [],
      totalPages: Math.ceil(response.response.meta.hits / +PAGE_SIZE),
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
