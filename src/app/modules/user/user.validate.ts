import z from "zod";
import { IsActive, Role } from "./user.interface";

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
            .regex(/^(?:\+8801\d{9}|01\d{9})$/,
                  { error: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX" }
            ),
      password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain uppercase letter")
            .regex(/[a-z]/, "Password must contain lowercase letter")
            .regex(/[0-9]/, "Password must contain 1 number"),
});

export const userLoginZodSchema = z.object({
      email: z
            .string()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"),
      password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain uppercase letter")
            .regex(/[a-z]/, "Password must contain lowercase letter")
            .regex(/[0-9]/, "Password must contain 1 number")
});

export const updateUserZodSchema = z.object({
      name: z
            .string()
            .min(3, { error: "Name must be at least 3 characters long." })
            .max(255, { error: "Name cannot exceed 255 characters." })
            .optional(),
      phone: z
            .string()
            .regex(/^(?:\+8801\d{9}|01\d{9})$/,
                  { error: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX" })
            .optional(),
      picture: z
            .string()
            .optional(),
      address: z
            .string()
            .trim()
            .max(255, "Address cannot exceed 255 characters.")
            .optional(),
      role: z
            .enum(Object.values(Role) as [string, ...string[]])
            .optional(),
      isActive: z
            .enum(Object.keys(IsActive) as [string, ...string[]])
            .optional(),
      isVerified: z
            .boolean({ error: "isVerified must be true or false." })
            .optional(),
      isDeleted: z
            .boolean({ error: "isDeleted must be true or false." })
            .optional()
});