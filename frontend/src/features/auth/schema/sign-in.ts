import z from 'zod'


// Definimos el esquema de validación con Zod
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores are allowed'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
})

// Inferimos el tipo de datos a partir del esquema (útil para TypeScript)
export type LoginFormData = z.infer<typeof loginSchema>
