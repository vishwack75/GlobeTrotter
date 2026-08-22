import { apiFetch } from "./api";

export const tripService = {
  getUserTrips: () => apiFetch("/trips"),
  getTripById: (id: string) => apiFetch(`/trips/${id}`),
  getPublicTrip: (shareCode: string) => apiFetch(`/trips/public/${shareCode}`),
  createTrip: (data: any) => apiFetch("/trips", { method: "POST", body: JSON.stringify(data) }),
  updateTrip: (id: string, data: any) => apiFetch(`/trips/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTrip: (id: string) => apiFetch(`/trips/${id}`, { method: "DELETE" }),
  copyTrip: (shareCode: string) => apiFetch(`/trips/copy/${shareCode}`, { method: "POST" }),
};
