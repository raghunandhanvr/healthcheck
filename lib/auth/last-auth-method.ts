export type AuthMethod = "email" | "google" | "passkey";

const LAST_AUTH_METHOD_KEY = "last-auth-method";

export function saveLastAuthMethod(method: AuthMethod): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_AUTH_METHOD_KEY, method);
  }
}

export function getLastAuthMethod(): AuthMethod | null {
  if (typeof window !== "undefined") {
    const method = localStorage.getItem(LAST_AUTH_METHOD_KEY);
    return method as AuthMethod | null;
  }
  return null;
}

export function clearLastAuthMethod(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LAST_AUTH_METHOD_KEY);
  }
}

export function getAuthMethodLabel(method: AuthMethod): string {
  switch (method) {
    case "email":
      return "Email & Password";
    case "google":
      return "Google";
    case "passkey":
      return "Passkey";
    default:
      return "";
  }
}
