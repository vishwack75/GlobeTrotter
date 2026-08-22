import { z } from "zod";

export const createCityValidator = z.object({
  name: z.string().min(2, "City name is required"),
  country: z.string().min(2, "Country is required"),
  region: z.string().min(2, "Region is required"),
  costIndex: z.number().int().min(1).max(5),
  popularity: z.number().min(0).max(5),
  description: z.string(),
  imageUrl: z.string().url("Invalid image URL"),
});
