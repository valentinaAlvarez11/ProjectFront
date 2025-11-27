import { z } from 'zod';

// Schema para crear una reserva
// Nota: usuarioId es opcional en el schema base, pero se valida condicionalmente para admin
export const createReservationSchema = z.object({
  habitacionId: z.coerce.number({
    required_error: "La habitación es requerida",
    invalid_type_error: "Debe seleccionar una habitación válida"
  }).min(1, "Debe seleccionar una habitación"),
  fecha_inicio: z.string({
    required_error: "La fecha de inicio es requerida"
  }).min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string({
    required_error: "La fecha de fin es requerida"
  }).min(1, "La fecha de fin es requerida"),
  usuarioId: z.coerce.number().min(1, "Debe seleccionar un usuario").optional(),
}).refine((data) => {
  const inicio = new Date(data.fecha_inicio);
  const fin = new Date(data.fecha_fin);
  return fin > inicio;
}, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["fecha_fin"]
});

// Schema para editar una reserva (admin)
export const updateReservationSchema = z.object({
  habitacionId: z.coerce.number({
    required_error: "La habitación es requerida",
    invalid_type_error: "Debe seleccionar una habitación válida"
  }).min(1, "Debe seleccionar una habitación"),
  fecha_inicio: z.string({
    required_error: "La fecha de inicio es requerida"
  }).min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string({
    required_error: "La fecha de fin es requerida"
  }).min(1, "La fecha de fin es requerida"),
  estado: z.enum(['pendiente', 'confirmada', 'cancelada'], {
    required_error: "El estado es requerido",
    invalid_type_error: "Debe seleccionar un estado válido"
  }),
}).refine((data) => {
  const inicio = new Date(data.fecha_inicio);
  const fin = new Date(data.fecha_fin);
  return fin > inicio;
}, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["fecha_fin"]
});

export type CreateReservationFormData = z.infer<typeof createReservationSchema>;
export type UpdateReservationFormData = z.infer<typeof updateReservationSchema>;

