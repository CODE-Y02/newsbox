import { z } from "zod";

const envSchema = z.object({
  // NODE
  NODE_ENV: z.enum(["development", "production", "local"]),

  // SERVER ENV
  PORT: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number()),

  // NEWS API
  NEWS_API_KEY: z.string(),
  NEWS_API_BASE: z.string(),

  // Redis
  REDIS_PORT: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number()),
  REDIS_USER: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_CONNECTION_STRING: z.string(),

  // DB
  POSTGRES_USER: z.string(),
  PG_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

const env = envSchema.parse(
  Object.keys(envSchema.shape).reduce((acc, key) => {
    const value = process.env[key];
    if (value === undefined) {
      const msg = `Missing environment variable: ${key}`;
      throw (new Error().message = msg);
    }
    return { ...acc, [key]: value };
  }, {})
);

export default env;
