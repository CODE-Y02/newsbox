import axios, { AxiosError } from "axios";
import config from "../config";
import { getFromCache, saveInCache } from "../redis";

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

export const NewsService = {
  async getTopHeadlines(query: {
    country?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  }) {
    const { country, category, page = 1, pageSize = 20 } = query;

    const cacheKey = JSON.stringify({ route: "/top-headlines", query });
    const cached = await getFromCache(cacheKey);

    if (cached) {
      return cached;
    }

    // cache it for 1 hour

    const response = await newsApi.get("/top-headlines", {
      params: {
        country,
        category,
        page,
        pageSize,
        language: "en",
      },
    });

    if (response.data) {
      await saveInCache(cacheKey, response.data, 60 * 60 * 10);
    }

    return response.data;
  },

  async searchNews(query: {
    q: string;
    from?: string;
    to?: string;
    language?: string;
    page?: number;
    pageSize?: number;
  }) {
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
  },

  async getSources(query: {
    country?: string;
    category?: string;
    language?: string;
  }) {
    const { country, category, language } = query;

    const response = await newsApi.get("/top-headlines/sources", {
      params: {
        country,
        category,
        language: "en",
      },
    });

    return response.data;
  },
};
