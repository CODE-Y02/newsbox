import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle, TGetArticlesResponse } from "@/types/News";

export interface NewsState {
  categories: {
    [key: string]: {
      articles: IArticle[];
      totalResults: number;
    };
  };
}

const initialState: NewsState = {
  categories: {},
};

export const newsSlice = createSlice({
  name: "news-by-category",
  initialState,
  reducers: {
    setByCategory: (
      state,
      action: PayloadAction<TGetArticlesResponse & { category: string }>
    ) => {
      // find state
      const { category, articles, totalResults } = action.payload;
      state.categories[category] = {
        articles: articles,
        totalResults: totalResults,
      };
    },
    resetByCategory: (state, action: PayloadAction<{ category: string }>) => {
      delete state.categories[action.payload.category];
    },
    appendByCategory: (
      state,
      action: PayloadAction<{ category: string; articles: IArticle[] }>
    ) => {
      const { category, articles } = action.payload;
      if (state.categories[category]) {
        state.categories[category].articles = [
          ...(state.categories[category].articles || []),
          ...articles,
        ];
      }
    },
  },
});

export const { setByCategory, resetByCategory, appendByCategory } =
  newsSlice.actions;

export default newsSlice.reducer;
