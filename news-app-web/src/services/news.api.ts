"use server";

import { IArticle } from "@/types/News";
import axios, { AxiosError } from "axios";

const newsApi = axios.create({
  baseURL: `${process.env.SERVER_BASE!}/api/news`,
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

type input = {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
};

export const getTopArticles = async (
  input: input
): Promise<IArticle[] | undefined> => {
  const response = await newsApi.get("/top-headlines", {
    params: { ...input },
  });

  return response.data?.data?.articles;
};
