import { z } from 'zod'

// Reglas compartidas
const emailRule = z.string()
  .max(40, { message: 'El email no puede superar 40 caracteres' })
  .regex(/^(?:[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?@[A-Za-z0-9]+|[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?)$/, {
    message: 'Formato inválido: solo letras/números, un "@" y opcionalmente un solo punto'
  })

const passwordRule = z.string()
  .min(7, { message: 'La contraseña debe tener al menos 7 caracteres' })
  .max(15, { message: 'La contraseña no puede superar 15 caracteres' })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: 'La contraseña debe incluir al menos un carácter especial'
  })

const nameRule = z.string()
  .max(20, { message: 'El nombre no puede superar 20 caracteres' })
  .regex(/^[A-Za-zÀ-ÿÑñ ]+$/, { message: 'El nombre solo puede contener letras y espacios' })

const phoneRule = z.string()
  .regex(/^\d+$/, { message: 'El teléfono solo puede contener números' })

// Schema para crear recepcionista (contraseña requerida)
export const createRecepcionistaSchema = z.object({
  email: emailRule,
  telefono: phoneRule,
  nombre: nameRule,
  contraseña: passwordRule,
  rol: z.literal('recepcionista'),
})

// Schema para editar recepcionista (contraseña opcional)
export const updateRecepcionistaSchema = z.object({
  email: emailRule,
  telefono: phoneRule,
  nombre: nameRule,
  contraseña: passwordRule.optional(),
  rol: z.literal('recepcionista'),
})

export type CreateRecepcionistaFormData = z.infer<typeof createRecepcionistaSchema>
export type UpdateRecepcionistaFormData = z.infer<typeof updateRecepcionistaSchema>

