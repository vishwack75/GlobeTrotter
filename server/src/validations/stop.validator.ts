import { z } from "zod";

export const addStopValidator = z.object({
  tripId: z.string().min(1, "Trip ID required"),
  cityId: z.string().min(1, "City ID required"),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  stopOrder: z.number().int().nonnegative().optional().default(0),
});

export const updateStopValidator = addStopValidator.partial();
