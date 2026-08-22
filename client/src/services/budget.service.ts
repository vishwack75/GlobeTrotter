import { apiFetch } from "./api";

export const budgetService = {
  getTripBudget: (tripId: string) => apiFetch(`/budget/${tripId}`),
  updateBudget: (tripId: string, categories: any[]) =>
    apiFetch(`/budget/${tripId}`, { method: "PUT", body: JSON.stringify({ categories }) }),
};
