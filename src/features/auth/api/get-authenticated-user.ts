import { http } from "@shared/api/http";
import type { AuthenticatedUser } from "../model/authenticated-user";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAuthenticatedUser(value: unknown): AuthenticatedUser {
  if (isRecord(value) && value.success === false) {
    throw new Error(
      typeof value.message === "string" && value.message
        ? value.message
        : "Could not load the current user.",
    );
  }

  if (
    !isRecord(value) ||
    value.success !== true ||
    !isRecord(value.data) ||
    typeof value.data.id !== "string" ||
    typeof value.data.email !== "string" ||
    typeof value.data.nameEn !== "string" ||
    typeof value.data.nameNe !== "string"
  ) {
    throw new Error(
      "The current-user response did not contain valid user details.",
    );
  }

  // Normalize the API's reversed name fields for the dashboard's language selector.
  const nameEn = value.data.nameNe;
  const nameNe = value.data.nameEn;

  return {
    id: value.data.id,
    email: value.data.email,
    displayName: nameEn,
    nameEn,
    nameNe,
  };
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  const response = await http.get<unknown>("/User/me");
  return parseAuthenticatedUser(response.data);
}
