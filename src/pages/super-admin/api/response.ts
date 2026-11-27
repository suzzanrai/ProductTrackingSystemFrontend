interface BackendError {
  message?: string;
  description?: string;
}

export interface BackendEnvelope<T> {
  success: boolean;
  data: T | null;
  error?: BackendError | string | null;
  message?: string;
}

export function unwrapBackendData<T>(response: BackendEnvelope<T>): T {
  if (!response.success) {
    const message =
      typeof response.error === "string"
        ? response.error
        : response.error?.description ?? response.error?.message ?? response.message;
    throw new Error(message || "The request was not successful.");
  }

  if (response.data === null) {
    throw new Error("The server returned an empty response.");
  }

  return response.data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getApiErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  if (!isRecord(error)) return undefined;

  if (isRecord(error.error) && typeof error.error.message === "string") {
    return error.error.message;
  }
  if (typeof error.message === "string") return error.message;

  if (
    isRecord(error.response) &&
    isRecord(error.response.data) &&
    isRecord(error.response.data.error) &&
    typeof error.response.data.error.message === "string"
  ) {
    return error.response.data.error.message;
  }

  return undefined;
}
