// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/redux/store";
// import { Categories } from "@/types/categories";
// import { useMemo, useCallback, useState, useEffect } from "react";
// import { appendByCategory, resetByCategory } from "@/redux/slices/newsSlice";
// import { getTopArticles } from "@/services/news.api";
// import { IArticle } from "@/types/News";

// interface UseNewsHookProps {
//   category?: Categories;
//   page?: number;
//   pageSize?: number;
// }

// const useNews = ({ page = 1, pageSize = 10, category }: UseNewsHookProps) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const newsState = useSelector((state: RootState) => state.news);
//   const [isLoading, setLoading] = useState(false);
//   const [list, setList] = useState<IArticle[]>([]);

//   const articlesForCategory = useMemo(() => {
//     if (category) {
//       const news = newsState.categories[category];
//       return news?.articles || [];
//     }
//     return [];
//   }, [newsState.categories, category]);

//   const totalResults = useMemo(() => {
//     if (category) {
//       const news = newsState.categories[category];
//       return news?.totalResults || 0;
//     }
//     return 0;
//   }, [newsState.categories, category]);

//   const hasNextPage = useMemo(() => {
//     if (category && totalResults) {
//       const loadedArticlesCount = articlesForCategory.length;
//       return loadedArticlesCount < totalResults;
//     }
//     return false;
//   }, [category, totalResults, articlesForCategory.length]);

//   const fetchNews = useCallback(async () => {
//     if (!category) return [];
//     setLoading(true);

//     // Check if we already have data in memory for the requested page
//     if (totalResults && articlesForCategory.length) {
//       const pageStartIndex = (page - 1) * pageSize;
//       const pageEndIndex = pageStartIndex + pageSize;

//       // Slice the articles for the current page from memory
//       const articlesForPage = articlesForCategory.slice(
//         pageStartIndex,
//         pageEndIndex
//       );

//       if (articlesForPage.length > 0) {
//         setLoading(false);
//         setList(articlesForPage);
//       }
//     }

//     const response = await getTopArticles({ category, page, pageSize });

//     if (response?.articles) {
//       dispatch(
//         appendByCategory({
//           articles: response.articles,
//           category,
//         })
//       );

//       setLoading(false);
//       setList(response.articles);
//     }
//   }, [category, page, pageSize, totalResults, articlesForCategory, dispatch]);

//   useEffect(() => {
//     fetchNews();
//   }, [page, category]);

//   const flush = useCallback(async () => {
//     category && dispatch(resetByCategory({ category }));
//   }, [category]);

//   return {
//     articlesForCategory,
//     totalResults,
//     hasNextPage,
//     list,
//     isLoading,
//     flush,
//   };
// };

// export default useNews;
