import axios, { AxiosError } from "axios";
import config from "../config";
import { getFromCache, saveInCache } from "../utils/cache";

const newsApi = axios.create({
  baseURL: config.env.default.NEWS_API_BASE,
  params: {
    apiKey: config.env.default.NEWS_API_KEY,
  },
});

// Response interceptor to refine Axios errors
newsApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      error.response?.data ||
      error.message ||
      "Failed to fetch data from News API";
    return Promise.reject(new Error(JSON.stringify(message)));
  }
);

export const NewsService = {};

export const getTopHeadlines = async (query: {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  language?: string;
}) => {
  const { country, category, page = 1, pageSize = 20, language = "en" } = query;

  const cacheKey = JSON.stringify({ route: "/top-headlines", query });
  const cached = await getFromCache(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await newsApi.get("/top-headlines", {
    params: {
      country,
      category,
      page,
      pageSize,
      language,
    },
  });

  if (response.data) {
    await saveInCache(cacheKey, response.data, 60 * 60); //  1 hr
  }

  return response.data;
};

export const searchNews = async (query: {
  q: string;
  from?: string;
  to?: string;
  language?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { q, from, to, language, page = 1, pageSize = 10 } = query;
  const cacheKey = JSON.stringify({ route: "/search", query });
  const cached = await getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await newsApi.get("/everything", {
    params: {
      q,
      from,
      to,
      language: "en",
      page,
      pageSize,
    },
  });

  if (response.data) {
    await saveInCache(cacheKey, response.data, 60 * 10); // 10 min
  }

  return response.data;
};

export const getSources = async (query: {
  country?: string;
  category?: string;
  language?: string;
}) => {
  const { country, category, language } = query;
  const cacheKey = JSON.stringify({ route: "/sources", query });
  const cached = await getFromCache(cacheKey);

  const response = await newsApi.get("/top-headlines/sources", {
    params: {
      country,
      category,
      language: "en",
    },
  });

  if (cached) {
    return cached;
  }

  if (response.data) {
    await saveInCache(cacheKey, response.data, 60 * 60 * 6); // 6 hr
  }

  return response.data;
};
