import { z } from "zod";

export const updateProfileValidator = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  avatarUrl: z.string().url("Invalid image URL").optional().nullable(),
  language: z.string().optional(),
});
