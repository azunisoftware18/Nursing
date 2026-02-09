import { z } from "zod";

export const createCollegeSchema = z.object({
  name: z.string().min(3, "College name is required"),
  code: z.string().min(2, "College code is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),

  type: z.enum(["govt", "private"], {
    required_error: "College type is required",
  }),

  description: z.string().optional(), 
});
