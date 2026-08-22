import { apiFetch } from "./api";
import type { LoginCredentials, SignupCredentials } from "../types/auth.types";

export const authService = {
  login: (credentials: LoginCredentials) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  signup: (credentials: SignupCredentials) =>
    apiFetch("/auth/signup", { method: "POST", body: JSON.stringify(credentials) }),
  refreshToken: () => apiFetch("/auth/refresh", { method: "POST" }),
  logout: () => apiFetch("/auth/logout", { method: "POST" }),
  forgotPassword: (email: string) =>
    apiFetch("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
};
