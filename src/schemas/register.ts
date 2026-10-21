import z from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo'),
  email: z
    .email({ message: 'El formato del correo electrónico no es válido' }),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe incluir al menos una letra mayúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número'),
  confirmPassword: z
    .string()
    .min(1, 'Debes confirmar tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;