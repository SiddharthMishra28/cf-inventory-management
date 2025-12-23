import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "Return workflow not implemented" }, 501);
}
