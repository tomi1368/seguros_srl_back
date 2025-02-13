import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(6).max(200).optional(),
});
