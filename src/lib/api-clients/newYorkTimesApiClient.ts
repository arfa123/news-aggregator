import axios from "axios";

import { CONTENT_TYPE_APPLICATION_JSON } from "@/config/constants";
import { ApiError } from "@/types/errors";

const NEW_YORK_TIMES_API_KEY = process.env.NEW_YORK_TIMES_API_KEY;
const NEW_YORK_TIMES_API_BASE_URL = process.env.NEW_YORK_TIMES_API_BASE_URL;

const newYorkTimesApiClient = axios.create({
  baseURL: NEW_YORK_TIMES_API_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_APPLICATION_JSON,
  },
});

newYorkTimesApiClient.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params["api-key"] = NEW_YORK_TIMES_API_KEY;

    return config;
  },
  (error) => {
    if (error.response) {
      const data = error.response.data;
      return Promise.reject(new ApiError(data.error || data.errors || data));
    } else if (error.message) {
      return Promise.reject(Error(error.message));
    } else {
      return Promise.reject(Error(error));
    }
  }
);

newYorkTimesApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const data = error.response.data;
      return Promise.reject(new ApiError(data.error || data.errors || data));
    } else if (error.message) {
      return Promise.reject(Error(error.message));
    } else {
      return Promise.reject(Error(error));
    }
  }
);

export { newYorkTimesApiClient };
