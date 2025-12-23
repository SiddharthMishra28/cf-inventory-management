import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "Auth middleware not implemented" }, 501);
}
