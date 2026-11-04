import { http } from "@shared/api/http";

export type LoginRequest =
  | { email: string; contact?: never; password: string }
  | { contact: string; email?: never; password: string };

export interface LoginResponse {
  token: string;
  expiresAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseLoginResponse(value: unknown): LoginResponse {
  if (isRecord(value) && value.success === false) {
    throw new Error(
      typeof value.message === "string" && value.message
        ? value.message
        : "Login failed.",
    );
  }

  const payload =
    isRecord(value) && "data" in value ? value.data : value;

  if (
    !isRecord(payload) ||
    typeof payload.token !== "string" ||
    !payload.token ||
    typeof payload.expiresAt !== "string" ||
    !Number.isFinite(Date.parse(payload.expiresAt)) ||
    Date.parse(payload.expiresAt) <= Date.now()
  ) {
    throw new Error("The login response did not contain a valid token.");
  }

  return {
    token: payload.token,
    expiresAt: payload.expiresAt,
  };
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await http.post<unknown>("/Auth/login", data);
  return parseLoginResponse(response.data);
}
