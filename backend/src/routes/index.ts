import { Elysia } from "elysia";
import { newsRoutes } from "./news.routes";

export const routes = new Elysia().use(newsRoutes);
