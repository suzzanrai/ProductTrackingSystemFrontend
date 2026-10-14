import axios, { AxiosError } from "axios";
import { env } from "@shared/config";
import type { ApiResponse } from "@shared/model";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Every error leaves here in the same shape: ApiResponse
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    const normalized: ApiResponse =
      error.response?.data ?? {
        success: false,
        message: error.message,
        data: null,
        error: {
          code: error.code ?? "NETWORK_ERROR",
          message: error.message,
        },
        statusCode: error.response?.status ?? 0,
        timestamp: new Date().toISOString(),
      };
    return Promise.reject(normalized);
  },
);