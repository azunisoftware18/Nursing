import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  code: z.string().min(3, "Code is required"),
  description: z.string().min(10, "Description too short"),
});
