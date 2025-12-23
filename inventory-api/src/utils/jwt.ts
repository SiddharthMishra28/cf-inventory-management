import { jsonResponse } from "./response";

export function handler(request: Request, env: any) {
  return jsonResponse({ message: "JWT utility not implemented" }, 501);
}
