import dayjs from "dayjs";

export const generatePaginationArray = (current: number, total: number) => {
  if (current <= 4) {
    return Array.from({ length: Math.min(5, total) }, (_, i) => i + 1);
  }
  if (current >= total - 3) {
    return Array.from({ length: Math.min(5, total) }, (_, i) =>
      Math.max(1, total - 4 + i)
    );
  }
  return [current - 2, current - 1, current, current + 1, current + 2];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const sortArticlesByDate = (articles: Article[]): Article[] => {
  return articles.sort((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);
    return dateB.valueOf() - dateA.valueOf();
  });
};

export const capitalize = (word: string) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export function isHTML(str: string): boolean {
  try {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  } catch (error) {
    return false;
  }
}

export function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}

export function createSearchParams(
  params: Record<string, string | string[] | undefined>
): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  return searchParams;
}
