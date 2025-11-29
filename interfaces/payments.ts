// interfaces/payments.ts
import { IMessageResponse } from "./base";

export interface IPayment {
  id: number;
  reservaId: number | null;
  usuarioId: number;
  numero_tarjeta: string;
  nombre_titular: string;
  fecha_expiracion: string;
  cvv: string;
  monto: number;
  estado: string;
  fecha_pago: string;
}

export interface IPaymentPayload {
  numero_tarjeta: string;
  nombre_titular: string;
  fecha_expiracion: string;
  cvv: string;
  monto: number;
  reservaId?: number | null;
}

export interface IPaymentCreateResponse extends IMessageResponse {
  id: number;
  numero_tarjeta: string;
}

export interface IPaymentAdmin extends IPayment {
  nombre_usuario: string;
  email_usuario: string;
}

export interface IPaymentsListResponse {
  pagos: IPayment[];
}

export interface IPaymentsAdminListResponse {
  pagos: IPaymentAdmin[];
}
