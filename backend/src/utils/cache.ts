import redisClient from "../redisClient";

// Save data to cache
export async function saveInCache<T>(
  key: string,
  data: T,
  ttl: number = 60 * 60
): Promise<void> {
  try {
    const cacheData = JSON.stringify(data);
    await redisClient.setex(key, ttl, cacheData); // Set data with expiration time (TTL)
    console.log(`Data saved in cache with key: ${key}`);
  } catch (error) {
    console.error("Error saving to Redis cache:", error);
  }
}

// Get data from cache
export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const result = await redisClient.get(key);
    if (result) {
      return JSON.parse(result) as T;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving from Redis cache:", error);
    return null;
  }
}

// Delete data from cache
export async function deleteFromCache(key: string): Promise<void> {
  try {
    await redisClient.del(key); // Delete cache entry by key
    console.log(`Cache deleted for key: ${key}`);
  } catch (error) {
    console.error("Error deleting from Redis cache:", error);
  }
}

// Check if a key exists in the cache
export async function existsInCache(key: string): Promise<boolean> {
  try {
    const result = await redisClient.exists(key);
    return result === 1; // Returns 1 if key exists, 0 if it doesn't
  } catch (error) {
    console.error("Error checking existence in Redis cache:", error);
    return false;
  }
}
