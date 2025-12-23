import { verifyJWT } from "../utils/jwt";
import { jsonResponse } from "../utils/response";

export async function requireAuth(
  request: Request
): Promise<{ user: any } | Response> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return jsonResponse({ error: "Missing Authorization" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = verifyJWT(token);

  if (!payload) {
    return jsonResponse({ error: "Invalid token" }, 401);
  }

  return { user: payload };
}
