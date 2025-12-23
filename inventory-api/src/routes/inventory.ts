import { jsonResponse } from "../utils/response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "Inventory handler not implemented" }, 501);
}
