export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  error: ApiError | null;
  statusCode: number;
  timestamp: string;
  page?: number;
  pageSize?: number;
  totalCount?: number;
}