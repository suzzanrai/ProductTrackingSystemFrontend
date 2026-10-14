function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  appName: required("VITE_APP_NAME"),
  apiBaseUrl: required("VITE_API_BASE_URL"),
  mode: required("VITE_ENV"),
} as const;