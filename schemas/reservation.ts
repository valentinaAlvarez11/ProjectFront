import { z } from 'zod';

// Schema para crear una reserva
// Nota: usuarioId es opcional en el schema base, pero se valida condicionalmente para admin
export const createReservationSchema = z.object({
  habitacionId: z.coerce.number()
    .min(1, "Debe seleccionar una habitación"),
  fecha_inicio: z.string()
    .min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string()
    .min(1, "La fecha de fin es requerida"),
  usuarioId: z.coerce.number().min(1, "Debe seleccionar un usuario").optional(),
}).refine((data) => {
  // Comparar fechas como strings YYYY-MM-DD para evitar problemas de zona horaria
  return data.fecha_fin > data.fecha_inicio;
}, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["fecha_fin"]
});

// Schema para editar una reserva (admin)
export const updateReservationSchema = z.object({
  habitacionId: z.coerce.number()
    .min(1, "Debe seleccionar una habitación"),
  fecha_inicio: z.string()
    .min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string()
    .min(1, "La fecha de fin es requerida"),
  estado: z.enum(['pendiente', 'confirmada', 'cancelada']),
}).refine((data) => {
  // Comparar fechas como strings YYYY-MM-DD para evitar problemas de zona horaria
  return data.fecha_fin > data.fecha_inicio;
}, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["fecha_fin"]
});

export type CreateReservationFormData = z.infer<typeof createReservationSchema>;
export type UpdateReservationFormData = z.infer<typeof updateReservationSchema>;

