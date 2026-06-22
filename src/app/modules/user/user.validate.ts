import z from "zod";
import { UserRole } from "./user.constraint";

export const userCreateZodSchema = z.object({
      name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(255, "Name can't exceed 255 characters")
            .trim(),
      email: z
            .string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
            .toLowerCase()
            .trim(),
      phone: z
            .string()
            .regex(/^\d{10,}$/, "Phone must be at least 10 digits"),
      password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain uppercase letter")
            .regex(/[0-9]/, "Password must contain a number"),
      role: z
            .enum(UserRole)
            .optional()
            .default(UserRole.CUSTOMER)
});

export const userLoginZodSchema = z.object({
      email: z
            .string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"),
      password: z
            .string()
            .min(6, "Password must be at least 6 characters")
});