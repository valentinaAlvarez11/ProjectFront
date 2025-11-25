import { z } from 'zod'

export const loginScheme = z.object({
  // Email: máximo 20 caracteres, solo alfanuméricos y un único "@" (sin otros especiales)
  email: z.string()
          .max(40, { message: 'El email no puede superar 40 caracteres' })
          .regex(/^(?:[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?@[A-Za-z0-9]+|[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?)$/, {
            message: 'Formato inválido: solo letras/números, un "@" y opcionalmente un solo punto'
          }),
  // Contraseña: máximo 15 caracteres
  password: z.string()
          .max(15, { message: 'La contraseña no puede superar 15 caracteres' })
})