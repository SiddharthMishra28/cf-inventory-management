const SECRET = "CHANGE_ME_LATER";

export function createJWT(payload: any): string {
  const base64Payload = btoa(JSON.stringify(payload));
  const signature = btoa(base64Payload + SECRET);
  return `${base64Payload}.${signature}`;
}

export function verifyJWT(token: string): any | null {
  try {
    const [payload, signature] = token.split(".");
    const expectedSig = btoa(payload + SECRET);
    if (signature !== expectedSig) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
