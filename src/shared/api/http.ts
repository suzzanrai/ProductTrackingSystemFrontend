import axios, { AxiosError } from "axios";
import { env } from "@shared/config";
import {
  clearAuthSession,
  getAuthToken,
  notifyAuthSessionExpired,
} from "@shared/lib";
import type { ApiResponse } from "@shared/model";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getValidationDetails(value: unknown) {
  if (!isRecord(value)) return undefined;
  const details: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(value)) {
    if (Array.isArray(messages) && messages.every((item) => typeof item === "string")) {
      details[key] = messages;
    }
  }
  return Object.keys(details).length > 0 ? details : undefined;
}

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Every error leaves here in the same shape: ApiResponse
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    if (error.response?.status === 401) {
      clearAuthSession();
      notifyAuthSessionExpired();
    }

    const body = isRecord(error.response?.data) ? error.response.data : {};
    const bodyError = isRecord(body.error) ? body.error : {};
    const message =
      (typeof bodyError.message === "string" && bodyError.message) ||
      (typeof bodyError.description === "string" && bodyError.description) ||
      (typeof body.message === "string" && body.message) ||
      error.message;
    const details = getValidationDetails(bodyError.details);
    const normalized: ApiResponse = {
      success: false,
      message,
      data: "data" in body ? body.data : null,
      error: {
        code:
          (typeof bodyError.code === "string" && bodyError.code) ||
          error.code ||
          "API_ERROR",
        message,
        ...(details && { details }),
      },
      statusCode: error.response?.status ?? 0,
      timestamp:
        (typeof body.timestamp === "string" && body.timestamp) ||
        new Date().toISOString(),
    };
    return Promise.reject(normalized);
  },
);
