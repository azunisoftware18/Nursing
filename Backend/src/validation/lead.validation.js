import z from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(3).optional(),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  course: z.string().optional(),
  college: z.string().optional(),
  message: z.string().max(500).optional(),
});
