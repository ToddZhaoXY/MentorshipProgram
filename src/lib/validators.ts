import { z } from "zod";

export const mentorSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  company: z.string(),
  bio: z.string(),
  expertise: z.array(z.string()),
  photoUrl: z.string(),
  maxSlots: z.number().int().positive(),
  linkedin: z.string().optional(),
  availability: z.string().optional(),
  contact: z.string().optional(),
});

export type Mentor = z.infer<typeof mentorSchema>;

export const registrationSchema = z.object({
  id: z.string(),
  mentorId: z.string(),
  alias: z.string(),
  createdAt: z.string(),
  status: z.enum(["confirmed", "cancelled"]),
});

export type Registration = z.infer<typeof registrationSchema>;

export const signupFormSchema = z.object({
  mentorId: z.string(),
  alias: z
    .string()
    .min(1, "Alias is required")
    .max(50)
    .regex(/^[a-zA-Z0-9._-]+$/, "Alias only — no @microsoft.com"),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;
