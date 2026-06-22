import z from "zod";
import { UserRole } from "./user.constraint";

export const userCreateZodSchema = z.object({
      name: z
            .string()
            .min(3, "Name must be in 3 characters")
            .max(255, "Name can't be more than 255 characters")
            .trim(),
      email: z
            // .email({ error: "Invalid email" })
            .string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email")
            .toLowerCase()
            .trim(),
      phone: z.string(),
      password: z.string(),
      role: z.enum(UserRole)
});

export const userLoginZodSchema = z.object({
      email: z
            .string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"),
      password: z
            .string()
            .min(6, "Password must be at least 6 characters")
});