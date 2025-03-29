import NewsCard from "@/components/NewsCard";
import { getTopArticles } from "@/services/news.api";
import { Categories } from "@/types/categories";
import React from "react";

const Home = async () => {
  const promiseArr = Object.values(Categories).map(async (category) => ({
    category,
    data: await fetchArticles(category),
  }));

  const data = await Promise.all(promiseArr);

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4">
        {data.map((d) => (
          <div className="mb-12" key={d.category}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              TOP {d.category.toLocaleUpperCase()} NEWS
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {d?.data?.map((news) => (
                <NewsCard data={news} key={news.title + news.publishedAt} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

const fetchArticles = async (category: string) => {
  const response = await getTopArticles({
    category: category,
    pageSize: 8,
  });

  return response?.articles;
};
