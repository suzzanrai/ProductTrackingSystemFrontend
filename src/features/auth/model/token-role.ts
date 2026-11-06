export const ROLE_DASHBOARDS = {
  SuperAdmin: "/super-admin/dashboard",
  FactoryAdmin: "/factory/dashboard",
  Farmer: "/farmer/dashboard",
  LocalAdmin: "/local-admin/dashboard",
} as const;

export type BackendRole = keyof typeof ROLE_DASHBOARDS;
export type DashboardDestination = (typeof ROLE_DASHBOARDS)[BackendRole];

function decodeBase64Url(value: string): string | null {
  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return atob(padded);
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string): BackendRole | null {
  const payloadSegment = token.split(".")[1];
  if (!payloadSegment) return null;

  const payload = decodeBase64Url(payloadSegment);
  if (!payload) return null;

  try {
    const claims: unknown = JSON.parse(payload);
    if (typeof claims !== "object" || claims === null || !("role" in claims)) {
      return null;
    }

    const role = claims.role;
    return typeof role === "string" && Object.hasOwn(ROLE_DASHBOARDS, role)
      ? (role as BackendRole)
      : null;
  } catch {
    return null;
  }
}

export function getDashboardForRole(role: BackendRole): DashboardDestination {
  return ROLE_DASHBOARDS[role];
}
