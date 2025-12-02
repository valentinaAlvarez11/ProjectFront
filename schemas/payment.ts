import { z } from 'zod';

// Schema para procesar un pago
export const paymentSchema = z.object({
  numero_tarjeta: z.string()
    .min(1, "El número de tarjeta es requerido")
    .refine((val) => {
      // Remover espacios y validar que tenga 16 dígitos
      const cleaned = val.replace(/\s/g, '');
      return /^\d{16}$/.test(cleaned);
    }, {
      message: "El número de tarjeta debe tener 16 dígitos"
    }),
  nombre_titular: z.string()
    .min(1, "El nombre del titular es requerido")
    .min(3, "El nombre del titular debe tener al menos 3 caracteres"),
  fecha_expiracion: z.string()
    .min(1, "La fecha de expiración es requerida")
    .refine((val) => {
      return /^\d{2}\/\d{2}$/.test(val);
    }, {
      message: "La fecha de expiración debe tener el formato MM/YY"
    }),
  cvv: z.string()
    .min(1, "El CVV es requerido")
    .refine((val) => {
      return /^\d{3,4}$/.test(val);
    }, {
      message: "El CVV debe tener 3 o 4 dígitos"
    }),
  monto: z.number()
    .min(0.01, "El monto debe ser mayor a 0")
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
