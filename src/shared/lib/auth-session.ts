const TOKEN_KEY = "token";
const EXPIRY_KEY = "tokenExpiresAt";

type AuthStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function removeSession(storage: AuthStorage) {
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(EXPIRY_KEY);
}

function readValidToken(storage: AuthStorage): string | null {
  const token = storage.getItem(TOKEN_KEY);
  const expiresAt = storage.getItem(EXPIRY_KEY);
  const expirationTime = expiresAt ? Date.parse(expiresAt) : Number.NaN;

  if (!token || !Number.isFinite(expirationTime) || expirationTime <= Date.now()) {
    if (token || expiresAt) removeSession(storage);
    return null;
  }

  return token;
}

export function getAuthToken(): string | null {
  return (
    readValidToken(window.localStorage) ?? 
    readValidToken(window.sessionStorage)
  );
}

export function getAuthSessionExpiry(): number | null {
  if (!getAuthToken()) return null;

  const expiresAt =
    window.localStorage.getItem(EXPIRY_KEY) ??
    window.sessionStorage.getItem(EXPIRY_KEY);
  const expirationTime = expiresAt ? Date.parse(expiresAt) : Number.NaN;

  return Number.isFinite(expirationTime) ? expirationTime : null;
}

export function saveAuthSession(
  token: string,
  expiresAt: string,
  remember: boolean,
) {
  const targetStorage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;

  removeSession(otherStorage);
  targetStorage.setItem(TOKEN_KEY, token);
  targetStorage.setItem(EXPIRY_KEY, expiresAt);
}

export function clearAuthSession() {
  removeSession(window.localStorage);
  removeSession(window.sessionStorage);
}
