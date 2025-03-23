import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";
import config from "./config";
import env from "./config/env";
import cors from "@elysiajs/cors";

const app = new Elysia()

  .use(
    swagger({
      ...config.swaggerConf,
      path: "/docs",
    })
  )
  .use(cors({ origin: "*" }))
  .onError(({ code, error, set, path, request }) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error({
      code,
      error: errorMessage,
      path,
      requestUrl: request.url,
      method: request.method,
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
  .use(routes);
// .listen(env.PORT);

const start = async () => {
  try {
    app.listen(env.PORT);

    console.log(
      `Server running at ${app.server?.hostname}:${app.server?.port}`
    );
    console.log(
      `Swagger docs available at http://${app.server?.hostname}:${app.server?.port}/docs`
    );
  } catch (error) {
    console.log("failed");
  }
};

start();
