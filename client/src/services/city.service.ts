import { apiFetch } from "./api";

export const cityService = {
  searchCities: (query = "") => apiFetch(`/cities/search?q=${encodeURIComponent(query)}`),
  getCityById: (id: string) => apiFetch(`/cities/${id}`),
};
