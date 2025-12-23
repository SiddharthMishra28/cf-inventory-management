import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: a ny) {
  return jsonResponse({ message: "DB client not implemented" }, 501);
}
