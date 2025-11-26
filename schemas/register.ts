import { z } from 'zod'

// Reglas compartidas con login
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

// Nombre: máx 20, solo letras (incluye acentos y ñ) y espacios
const nameRule = z.string()
  .max(20, { message: 'El nombre no puede superar 20 caracteres' })
  .regex(/^[A-Za-zÀ-ÿÑñ ]+$/, { message: 'El nombre solo puede contener letras y espacios' })

// Teléfono: solo números
const phoneRule = z.string()
  .regex(/^\d+$/, { message: 'El teléfono solo puede contener números' })

export const registerSchema = z.object({
  email: emailRule,
  telefono: phoneRule,
  nombre: nameRule,
  contraseña: passwordRule,
})

export type RegisterFormSchema = z.infer<typeof registerSchema>


