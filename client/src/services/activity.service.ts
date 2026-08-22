import { apiFetch } from "./api";

export const activityService = {
  searchActivities: (cityId?: string, query = "") =>
    apiFetch(`/activities/search?cityId=${cityId || ""}&q=${encodeURIComponent(query)}`),
  addActivityToStop: (data: any) =>
    apiFetch("/activities/stop-activity", { method: "POST", body: JSON.stringify(data) }),
  removeActivityFromStop: (id: string) =>
    apiFetch(`/activities/stop-activity/${id}`, { method: "DELETE" }),
};
