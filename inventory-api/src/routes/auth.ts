import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "Auth handler not implemented" }, 501);
}
