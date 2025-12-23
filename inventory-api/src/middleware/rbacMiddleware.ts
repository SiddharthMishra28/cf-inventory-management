import { jsonResponse } from "../utils/response";

const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ["*"],
  manager: ["inventory:read", "inventory:write", "issue", "return", "analytics"],
  staff: ["inventory:read", "issue", "return"],
  viewer: ["inventory:read"]
};

export function requirePermission(
  user: any,
  permission: string
): Response | null {
  const allowed = ROLE_PERMISSIONS[user.role] || [];

  if (allowed.includes("*") || allowed.includes(permission)) {
    return null;
  }

  return jsonResponse({ error: "Forbidden" }, 403);
}
