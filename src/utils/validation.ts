import { z } from "zod";

// Personal Information validation schema
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  addressLine1: z
    .string()
    .min(1, "Address is required"),
  addressLine2: z
    .string()
    .optional(),
  city: z
    .string()
    .min(1, "City is required"),
  state: z
    .string()
    .min(1, "State is required"),
  zipcode: z
    .string()
    .min(5, "Zipcode must be at least 5 characters")
    .refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
      message: "Please enter a valid US zipcode (e.g., 12345 or 12345-6789)",
    }),
});

// Educational Status validation schema
export const educationalStatusSchema = z.object({
  isStudying: z.boolean(),
  studyingAt: z
    .string()
    .optional()
    .refine(
      (val, ctx) => {
        if (ctx.parent.isStudying && (!val || val.trim() === "")) {
          return false;
        }
        return true;
      },
      {
        message: "Please specify where you are studying",
      }
    ),
});

// Project validation schema
export const projectSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
});

// Projects array validation schema
export const projectsSchema = z.object({
  projects: z
    .array(projectSchema)
    .min(1, "At least one project is required"),
});

// Complete form validation schema
export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  educationalStatus: educationalStatusSchema,
  projects: z.array(projectSchema).min(1),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type EducationalStatusSchema = z.infer<typeof educationalStatusSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ProjectsSchema = z.infer<typeof projectsSchema>;
export type FormSchema = z.infer<typeof formSchema>;