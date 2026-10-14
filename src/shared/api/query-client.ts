import { QueryCache, QueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@shared/model";

function shouldRetry(failureCount: number, error: unknown) {
  const status = (error as ApiResponse | undefined)?.statusCode ?? 0;
  // Do not retry client errors (400-499): the request itself is wrong
  if (status >= 400 && status < 500) return false;
  return failureCount < 2;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Query error:", error);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
  },
});