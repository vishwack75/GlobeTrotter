import { z } from "zod";

export const signupValidator = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(3, "First Name cannot be empty"),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(3, "Last Name cannot be empty"),
  name: z.string().optional(),
  email: z
    .string({ message: "Email Address is required" })
    .email("Please enter a valid email address (e.g. user@gmail.com)"),
  phone: z
    .string({ message: "Phone Number is required" })
    .min(5, "Phone Number must be at least 5 digits"),
  city: z
    .string({ message: "City is required" })
    .min(3, "City cannot be empty"),
  country: z
    .string({ message: "Country is required" })
    .min(3, "Country cannot be empty"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  avatarUrl: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
});

export const loginValidator = z.object({
  email: z
    .string({ message: "Username or Email is required" })
    .min(3, "Username or Email cannot be empty"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export const forgotPasswordValidator = z.object({
  email: z
    .string({ message: "Email Address is required" })
    .email("Please enter a valid email address"),
});
