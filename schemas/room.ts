import { z } from 'zod';

// Schema para las instalaciones
const instalacionesSchema = z.object({
  wifi: z.boolean().default(false),
  television: z.boolean().default(false),
  aireAcondicionado: z.boolean().default(false),
  banoDucha: z.boolean().default(false),
  plancha: z.boolean().default(false),
  toallas: z.boolean().default(false),
  smartTV: z.boolean().default(false),
  refrigerador: z.boolean().default(false),
});

// Schema para las características
const caracteristicasSchema = z.object({
  tamano: z.string().min(1, { message: 'El tamaño es obligatorio' }),
  camas: z.string().min(1, { message: 'Las camas son obligatorias' }),
  vista: z.string().min(1, { message: 'La vista es obligatoria' }),
  instalaciones: instalacionesSchema,
});

// Schema principal para crear habitación
export const createRoomSchema = z.object({
  numero: z.string()
    .min(1, { message: 'El número de habitación es obligatorio' })
    .max(10, { message: 'El número no puede superar 10 caracteres' }),
  tipo: z.string()
    .min(1, { message: 'El tipo de habitación es obligatorio' })
    .max(50, { message: 'El tipo no puede superar 50 caracteres' }),
  precio_noche: z.number()
    .min(0.01, { message: 'El precio debe ser mayor a 0' })
    .max(999999, { message: 'El precio es demasiado alto' }),
  descripcion: z.string()
    .max(500, { message: 'La descripción no puede superar 500 caracteres' })
    .nullable()
    .optional(),
  caracteristicas: caracteristicasSchema,
  imagenes: z.array(z.string().url({ message: 'Debe ser una URL válida' }).or(z.literal('')))
    .min(0)
    .max(10, { message: 'Máximo 10 imágenes' })
    .default([])
    .transform((arr) => arr.filter(url => url && url.trim() !== '')),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

