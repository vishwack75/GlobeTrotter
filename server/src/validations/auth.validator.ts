import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

export const signupValidator = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(1, "First Name cannot be empty"),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(1, "Last Name cannot be empty"),
  name: z.string().optional(),
  email: z
    .string({ message: "Email Address is required" })
    .email("Please enter a valid email address (e.g. user@gmail.com)"),
  phone: z
    .string({ message: "Phone Number is required" })
    .min(5, "Phone Number must be at least 5 digits"),
  city: z
    .string({ message: "City is required" })
    .min(1, "City cannot be empty"),
  country: z
    .string({ message: "Country is required" })
    .min(1, "Country cannot be empty"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .regex(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol"
    ),
  avatarUrl: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
});

export const loginValidator = z.object({
  email: z
    .string({ message: "Username or Email is required" })
    .min(1, "Username or Email cannot be empty"),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password cannot be empty"),
});

export const forgotPasswordValidator = z.object({
  email: z
    .string({ message: "Email Address is required" })
    .email("Please enter a valid email address"),
});
