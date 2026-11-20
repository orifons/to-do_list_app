import z from "zod"

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores are allowed"),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z
    .email("Please enter a valid email address")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters"),
  passwordConfirm: z
    .string()
    .min(8, "Password confirmation must be at least 8 characters long")
    .max(100, "Password confirmation cannot exceed 100 characters"),
})
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })