import { handler as authHandler } from "./routes/auth";
import { handler as inventoryHandler } from "./routes/inventory";
import { handler as issueHandler } from "./routes/issue";
import { handler as returnHandler } from "./routes/return";
import { handler as analyticsHandler } from "./routes/analytics";
import { handler as nlpHandler } from "./routes/nlp";
import { jsonResponse } from "./utils/response";

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path.startsWith("/auth")) {
        return authHandler(request, env);
      }

      if (path.startsWith("/inventory")) {
        return inventoryHandler(request, env);
      }

      if (path.startsWith("/issue")) {
        return issueHandler(request, env);
      }

      if (path.startsWith("/return")) {
        return returnHandler(request, env);
      }

      if (path.startsWith("/analytics")) {
        return analyticsHandler(request, env);
      }

      if (path.startsWith("/nlp")) {
        return nlpHandler(request, env);
      }

      if (path === "/health") {
        return jsonResponse({ status: "ok" });
      }

      return jsonResponse({ error: "Not Found" }, 404);

    } catch (err: any) {
      return jsonResponse({ error: err.message || "Internal Error" }, 500);
    }
  }
};
