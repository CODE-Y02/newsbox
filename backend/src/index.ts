import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";
import config from "./config";

const app = new Elysia()

  .use(
    swagger({
      ...config.swaggerConf,
      path: "/docs",
    })
  )
  .onError(({ code, error, set }) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error({
      code,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });

    switch (code) {
      case "VALIDATION":
        set.status = 400;
        return {
          status: "error",
          message: `Validation error: ${errorMessage}`,
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
          message: errorMessage || "Internal server error",
          data: null,
        };
    }
  })
  .use(routes)
  .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
console.log(
  `Swagger docs available at http://${app.server?.hostname}:${app.server?.port}/docs`
);
