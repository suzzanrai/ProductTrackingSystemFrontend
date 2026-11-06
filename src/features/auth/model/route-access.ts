import { redirect } from "@tanstack/react-router";
import { getAuthToken } from "@shared/lib";
import {
  getDashboardForRole,
  getRoleFromToken,
  type BackendRole,
} from "./token-role";

export function requireBackendRole(expectedRole: BackendRole): void {
  const token = getAuthToken();
  if (!token) throw redirect({ to: "/login" });

  const role = getRoleFromToken(token);
  if (!role) throw redirect({ to: "/login" });
  if (role !== expectedRole) {
    throw redirect({ to: getDashboardForRole(role) });
  }
}
