import z from 'zod'


// Definimos el esquema de validación con Zod
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(20, 'El nombre de usuario no puede superar los 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

// Inferimos el tipo de datos a partir del esquema (útil para TypeScript)
export type LoginFormData = z.infer<typeof loginSchema>
