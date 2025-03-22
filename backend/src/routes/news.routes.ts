import { Elysia, t } from "elysia";
import { NewsService } from "../services/news.service";
import { successResponse } from "../types";

export const newsRoutes = new Elysia({ prefix: "/api/news" })
  .get(
    "/top-headlines",
    async ({ query, set }) => {
      const data = await NewsService.getTopHeadlines(query);
      return successResponse(data, "Top headlines fetched successfully");
    },
    {
      query: t.Object({
        country: t.Optional(
          t.String({ description: "Country code (e.g., us, uk)" })
        ),
        category: t.Optional(
          t.String({ description: "News category (e.g., technology, sports)" })
        ),
        page: t.Optional(
          t.Numeric({ default: 1, description: "Page number for pagination" })
        ),
        pageSize: t.Optional(
          t.Numeric({
            default: 20,
            maximum: 100,
            description: "Articles per page",
          })
        ),
      }),
      detail: {
        tags: ["News"],
        summary: "Get top news headlines",
        description: "Fetches top headlines based on country and category.",
        responses: {
          200: { description: "Successful response with news articles" },
          400: { description: "Invalid query parameters" },
          500: { description: "Server error" },
        },
      },
    }
  )
  .get(
    "/search",
    async ({ query, set }) => {
      const data = await NewsService.searchNews(query);
      return successResponse(data, "Search results fetched successfully");
    },
    {
      query: t.Object({
        q: t.String({ description: "Search keyword or phrase" }),
        from: t.Optional(t.String({ description: "Start date (YYYY-MM-DD)" })),
        to: t.Optional(t.String({ description: "End date (YYYY-MM-DD)" })),
        language: t.Optional(
          t.String({ description: "Language code (e.g., en)" })
        ),
        page: t.Optional(t.Numeric({ default: 1, description: "Page number" })),
        pageSize: t.Optional(
          t.Numeric({
            default: 20,
            maximum: 100,
            description: "Articles per page",
          })
        ),
      }),
      detail: {
        tags: ["News"],
        summary: "Search news articles",
        description:
          "Searches news articles by keyword, date range, and language.",
        responses: {
          200: { description: "Successful response with search results" },
          400: { description: "Invalid query parameters" },
          500: { description: "Server error" },
        },
      },
    }
  )
  .get(
    "/sources",
    async ({ query, set }) => {
      const data = await NewsService.getSources(query);
      return successResponse(data, "Sources fetched successfully");
    },
    {
      query: t.Object({
        country: t.Optional(
          t.String({ description: "Country code (e.g., us)" })
        ),
        category: t.Optional(
          t.String({ description: "Category (e.g., business)" })
        ),
        language: t.Optional(
          t.String({ description: "Language code (e.g., en)" })
        ),
      }),
      detail: {
        tags: ["News"],
        summary: "Get news sources",
        description: "Retrieves a list of available news sources.",
        responses: {
          200: { description: "Successful response with source list" },
          400: { description: "Invalid query parameters" },
          500: { description: "Server error" },
        },
      },
    }
  );
