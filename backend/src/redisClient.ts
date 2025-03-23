import Redis from "ioredis";
import env from "./config/env";

const redisClient = new Redis(env.REDIS_CONNECTION_STRING);

// Log error if the cluster client encounters any issues
redisClient.on("error", (err) => {
  console.error("Redis Cluster client error:", err);
});

redisClient.on("connecting", () => console.log("connecting to redis "));
redisClient.on("close", () => console.log("connection to redis closed"));
redisClient.on("connect", () => console.log("connected to redis"));

export default redisClient;
