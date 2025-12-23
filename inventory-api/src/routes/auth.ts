import { jsonResponse } from "../utils/response";
import { createJWT, hashPassword } from "../utils/jwt";

export async function handler(request: Request, env: any) {
  const url = new URL(request.url);

  if (request.method === "POST" && url.pathname === "/auth/signup") {
    const body = await request.json();
    const { email, password } = body;

    const passwordHash = await hashPassword(password);

    await env.DB.prepare(
      "INSERT INTO users (id, email, password_hash, role) VALUES (?, ?, ?, ?)"
    ).bind(
      crypto.randomUUID(),
      email,
      passwordHash,
      "staff"
    ).run();

    return jsonResponse({ message: "User created" }, 201);
  }

  if (request.method === "POST" && url.pathname === "/auth/login") {
    const body = await request.json();
    const { email, password } = body;

    const passwordHash = await hashPassword(password);

    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE email = ? AND password_hash = ?"
    ).bind(email, passwordHash).first();

    if (!user) {
      return jsonResponse({ error: "Invalid credentials" }, 401);
    }

    const token = createJWT({
      userId: user.id,
      role: user.role
    });

    return jsonResponse({ token });
  }

  return jsonResponse({ error: "Not Found" }, 404);
}
