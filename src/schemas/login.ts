import z from "zod";

export const loginSchema = z.object({
  email: z
    .email('El formato del correo electrónico no es válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña no puede superar los 20 caracteres'),
  role: z.enum(['usuario', 'admin', 'invitado'], {
    error: 'Selecciona un rol válido',
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;