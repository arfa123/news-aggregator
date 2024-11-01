import { CONTENT_TYPE_APPLICATION_JSON } from "@/config/constants";
import { combineURLs, createSearchParams } from "@/lib/utils";
import { ApiError } from "@/types/errors";

const NEWS_API_KEY = process.env.NEWS_API_KEY || "";
const NEWS_API_BASE_URL = process.env.NEWS_API_BASE_URL || "";

async function newsApiFetch(
  endpoint: string,
  options: RequestOptions = {}
): Promise<Response> {
  const { params = {}, ...fetchOptions } = options;

  const allParams = { ...params, apiKey: NEWS_API_KEY };

  const fullURL = combineURLs(NEWS_API_BASE_URL, endpoint);
  const url = new URL(fullURL);

  const searchParams = createSearchParams(allParams);
  url.search = searchParams.toString();

  const defaultHeaders = {
    "Content-Type": CONTENT_TYPE_APPLICATION_JSON,
  };

  const mergedOptions: RequestInit = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  try {
    const response = await fetch(url.toString(), mergedOptions);

    if (!response.ok) {
      const data = await response.json();
      throw new ApiError(data.error || data.errors || data);
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
}

const newsApiClient = {
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await newsApiFetch(endpoint, {
      ...options,
      method: "GET",
    });
    return response.json();
  },
};

export { newsApiClient };
