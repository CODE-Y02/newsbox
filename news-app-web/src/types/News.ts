export interface IArticle {
  source: {
    id: null | string | undefined;
    name: string;
  };
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type TGetTopNewsInput = {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
};

export type TGetArticlesResponse = {
  articles: IArticle[];
  totalResults: number;
  status: string;
};
