import z from "zod"

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores are allowed"),
  first_name: z
    .string()
    .trim()
    .optional(),
  last_name: z
    .string()
    .trim()
    .optional(),
  email: z
    .email("Please enter a valid email address")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password cannot exceed 100 characters"),
  password_confirm: z
    .string()
    .min(8, "Password confirmation must be at least 8 characters long")
    .max(100, "Password confirmation cannot exceed 100 characters"),
})
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>