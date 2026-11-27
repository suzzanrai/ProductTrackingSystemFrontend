export interface AuthenticatedUser {
  id: string;
  displayName: string;
  email: string;
  nameEn?: string;
  nameNe?: string;
}

export const unavailableAuthenticatedUser: AuthenticatedUser = {
  id: "",
  displayName: "",
  email: "",
};

export const previewAuthenticatedUser: AuthenticatedUser = {
  id: "preview-user",
  displayName: "Demo User",
  email: "demo.user@example.test",
};
