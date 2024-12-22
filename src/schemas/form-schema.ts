"use client"

import { z } from "zod"

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]+$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  }
  ),
});
