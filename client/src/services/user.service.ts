import { apiFetch } from "./api";

export const userService = {
  getProfile: () => apiFetch("/user/profile"),
  updateProfile: (data: any) => apiFetch("/user/profile", { method: "PUT", body: JSON.stringify(data) }),
  deleteAccount: () => apiFetch("/user/account", { method: "DELETE" }),
  toggleSaveDestination: (cityId: string) =>
    apiFetch("/user/saved-destinations/toggle", { method: "POST", body: JSON.stringify({ cityId }) }),
};
