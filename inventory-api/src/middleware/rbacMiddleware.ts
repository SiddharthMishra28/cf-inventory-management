import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "RBAC middleware not implemented" }, 501);
}
