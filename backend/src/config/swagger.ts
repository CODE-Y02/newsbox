import { ElysiaSwaggerConfig } from "@elysiajs/swagger";

const config: ElysiaSwaggerConfig = {
  documentation: {
    info: {
      title: "News App API",
      version: "1.0.0",
      description: "API for fetching news data from NewsAPI",
    },
    tags: [{ name: "News", description: "News-related endpoints" }],
  },
};

export default config;
