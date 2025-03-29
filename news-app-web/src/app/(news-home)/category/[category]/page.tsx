"use server";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { getTopArticles } from "@/services/news.api";
import Link from "next/link";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; size?: string }>;
};

const NewsByCategoryPage = async (props: Props) => {
  const { category } = await props.params;
  const { page, size } = await props.searchParams;

  const currentPage = Number(page) || 1;

  const data = await getTopArticles({
    category,
    page: currentPage,
    pageSize: 8,
  });

  if (!data?.articles) return <p>No articles</p>;

  const hasNextPg = data.totalResults - currentPage * 8 > 0;

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.articles.map((item) => (
            <NewsCard key={item.title + item.url} data={item} />
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          {currentPage > 1 && (
            <Link href={`/category/${category}?page=${currentPage - 1}`}>
              <Button>Previous Page</Button>
            </Link>
          )}

          {hasNextPg && (
            <Link
              href={`/category/${category}?page=${currentPage + 1}`}
              className="ml-auto"
            >
              <Button>Next page</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsByCategoryPage;
