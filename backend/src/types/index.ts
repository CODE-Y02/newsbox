// src/types/index.ts
export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
};

// Helper to wrap successful responses
export const successResponse = <T>(
  data: T,
  message = "Request successful"
): ApiResponse<T> => ({
  status: "success",
  message,
  data,
});
