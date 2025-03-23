// import Redis from "ioredis";
// import env from "./config/env";

// const redis = new Redis(
//   `rediss://:${env.REDIS_PASSWORD}@${env.REDIS_HOST}:${env.REDIS_PORT}`
// );

// const CACHE_TTL = 60; // 60 seconds

// redis.on("connect", () => {
//   console.log("Connected to Redis");
// });
// redis.on("error", (err) => {
//   console.error("Redis connection error:", err);
// });

// export default redis;

// export async function saveInCache<T>(
//   key: string,
//   data: T,
//   ttl: number = CACHE_TTL
// ): Promise<void> {
//   try {
//     // Set data in Redis with TTL
//     await redis.setex(key, ttl, JSON.stringify(data));
//   } catch (error) {
//     console.error("Error saving to Redis:", error);
//   }
// }

// export async function getFromCache<T>(key: string): Promise<T | null> {
//   try {
//     // Get data from Redis
//     const result = await redis.get(key);
//     if (result) {
//       return JSON.parse(result) as T;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error retrieving from Redis:", error);
//     return null;
//   }
// }
