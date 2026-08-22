import { z } from "zod";

export const addStopActivityValidator = z.object({
  stopId: z.string().min(1, "Stop ID required"),
  activityId: z.string().optional(),
  customTitle: z.string().optional(),
  cost: z.number().nonnegative().optional().default(0),
  dayNumber: z.number().int().positive().optional().default(1),
  startTime: z.string().optional(),
  notes: z.string().optional(),
});

export const createCityActivityValidator = z.object({
  cityId: z.string().min(1, "City ID required"),
  title: z.string().min(2, "Title required"),
  category: z.string().min(2, "Category required"),
  cost: z.number().nonnegative(),
  duration: z.number().int().positive(),
  description: z.string(),
  imageUrl: z.string().url("Invalid image URL"),
});
