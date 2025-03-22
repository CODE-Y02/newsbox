import NewsCard from "@/components/NewsCard";
import { getTopArticles } from "@/services/news.api";
import { Categories } from "@/types/categories";
import React from "react";

const Home = async () => {
  // Fetch data for each category
  const business = await getTopArticles({
    category: Categories.Business,
    pageSize: 10,
  });

  const entertainment = await getTopArticles({
    category: Categories.Entertainment,
    pageSize: 10,
  });

  const health = await getTopArticles({
    category: Categories.Health,
    pageSize: 10,
  });

  const science = await getTopArticles({
    category: Categories.Science,
    pageSize: 10,
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Business Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Top Business News
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {business?.map((news) => (
              <NewsCard data={news} key={news.title + news.publishedAt} />
            ))}
          </div>
        </div>

        {/* Entertainment Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Top Entertainment News
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {entertainment?.map((news) => (
              <NewsCard data={news} key={news.title + news.publishedAt} />
            ))}
          </div>
        </div>

        {/* Health Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Top Health News
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {health?.map((news) => (
              <NewsCard data={news} key={news.title + news.publishedAt} />
            ))}
          </div>
        </div>

        {/* Science Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Top Science News
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {science?.map((news) => (
              <NewsCard data={news} key={news.title + news.publishedAt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
