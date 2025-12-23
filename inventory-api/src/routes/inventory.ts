import { jsonResponse } from "../utils/response";
import { requireAuth } from "../middleware/authMiddleware";
import { requirePermission } from "../middleware/rbacMiddleware";

export async function handler(request: Request, env: any) {
  // Authentication
  const authResult = await requireAuth(request);
  if (authResult instanceof Response) {
    return authResult;
  }
  const { user } = authResult;

  // RBAC
  const permissionResult = requirePermission(user, "inventory:read");
  if (permissionResult instanceof Response) {
    return permissionResult;
  }

  // If we get here, the user is authenticated and has permission
  return jsonResponse({ message: "You have access to the inventory" });
}
