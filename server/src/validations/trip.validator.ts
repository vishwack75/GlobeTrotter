import { z } from "zod";

export const createTripValidator = z.object({
  name: z.string().min(2, "Trip name must be at least 2 characters"),
  description: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  coverPhoto: z.string().optional(),
  budgetLimit: z.number().nonnegative().optional().default(0),
  isPublic: z.boolean().optional().default(false),
});

export const updateTripValidator = createTripValidator.partial();
