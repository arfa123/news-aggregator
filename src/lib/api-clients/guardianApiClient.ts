import axios from "axios";

import { ApiError } from "@/lib/types/api";

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const GUARDIAN_API_BASE_URL = process.env.GUARDIAN_API_BASE_URL;
const CONTENT_TYPE_APPLICATION_JSON = "application/json";

const guardianApiClient = axios.create({
  baseURL: GUARDIAN_API_BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_APPLICATION_JSON,
  },
});

guardianApiClient.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params["api-key"] = GUARDIAN_API_KEY;

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

guardianApiClient.interceptors.response.use(
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

export { guardianApiClient };
