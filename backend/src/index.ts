// src/index.ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";

const app = new Elysia()
  // Swagger Documentation
  .use(
    swagger({
      documentation: {
        info: {
          title: "News App API",
          version: "1.0.0",
          description: "API for fetching news data from NewsAPI",
        },
        tags: [{ name: "News", description: "News-related endpoints" }],
      },
      path: "/docs",
    })
  )
  // Global Error Handling
  .onError(({ code, error, set }) => {
    console.error({
      code,
      error: (error as Error).message!,
      timestamp: new Date().toISOString(),
    });

    switch (code) {
      case "VALIDATION":
        set.status = 400;
        return {
          status: "error",
          message: `Validation error: ${error.message}`,
          data: null,
        };
      case "NOT_FOUND":
        set.status = 404;
        return {
          status: "error",
          message: "Route not found",
          data: null,
        };
      default:
        set.status = 500;
        return {
          status: "error",
          message: error || "Internal server error",
          data: null,
        };
    }
  })
  // Mount all routes
  .use(routes)
  .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
console.log(
  `Swagger docs available at http://${app.server?.hostname}:${app.server?.port}/docs`
);
