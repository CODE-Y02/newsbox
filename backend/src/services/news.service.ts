import axios, { AxiosError } from "axios";
import config from "../config";

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

  // const cacheKey = JSON.stringify({ route: "/top-headlines", query });
  // const cached = await getFromCache(cacheKey);

  // if (cached) {
  //   return cached;
  // }

  // cache it for 1 hour

  const response = await newsApi.get("/top-headlines", {
    params: {
      country,
      category,
      page,
      pageSize,
      language,
    },
  });

  // if (response.data) {
  //   await saveInCache(cacheKey, response.data, 60 * 60 * 10);
  // }

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
  const { q, from, to, language, page = 1, pageSize = 20 } = query;

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

  return response.data;
};

export const getSources = async (query: {
  country?: string;
  category?: string;
  language?: string;
}) => {
  const { country, category, language } = query;

  const response = await newsApi.get("/top-headlines/sources", {
    params: {
      country,
      category,
      language: "en",
    },
  });

  return response.data;
};
