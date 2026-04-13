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
  name: z.string(),
  createdAt: z.string(),
  status: z.enum(["confirmed", "cancelled"]),
});

export type Registration = z.infer<typeof registrationSchema>;

export const signupFormSchema = z.object({
  mentorId: z.string(),
  name: z.string().min(1, "Name is required").max(100),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;
