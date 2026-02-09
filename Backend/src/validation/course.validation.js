import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(3, "Course name must be at least 3 characters"),
  code: z.string().min(2, "Course code must be at least 2 characters"),
  duration: z.string().min(1, "Duration is required"),
  eligibility: z.string().optional(),
});
