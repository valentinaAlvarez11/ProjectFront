// libs/payments.service.ts
import { apiFetch } from "@/utils/singletonFetch"; 
import { IMessageResponse } from "@/interfaces/base";
import { 
    IPaymentPayload,
    IPaymentCreateResponse,
    IPaymentsListResponse,
    IPaymentsAdminListResponse
} from "@/interfaces/payments"; 

const PaymentsService = {
  
  /**
   * Procesa un pago.
   * Endpoint: POST /payments
   * La cookie 'token' se adjunta automáticamente.
   */
  createPayment: async (data: IPaymentPayload): Promise<IPaymentCreateResponse> => {
    return apiFetch('payments', 'POST', data) as Promise<IPaymentCreateResponse>;
  },

  /**
   * Actualiza un pago (principalmente para agregar reservaId).
   * Endpoint: PUT /payments/:id
   */
  updatePayment: async (id: number, data: { reservaId?: number | null }): Promise<IMessageResponse> => {
    return apiFetch(`payments/${id}`, 'PUT', data) as Promise<IMessageResponse>;
  },

  /**
   * Obtiene todos los pagos del usuario autenticado.
   * Endpoint: GET /payments/my
   */
  getMyPayments: async (): Promise<IPaymentsListResponse> => {
    return apiFetch('payments/my', 'GET') as Promise<IPaymentsListResponse>;
  },

  /**
   * Obtiene todos los pagos del sistema (vista de administrador/recepcionista con información de usuarios).
   * Endpoint: GET /payments/admin
   */
  getAllAdmin: async (): Promise<IPaymentsAdminListResponse> => {
    return apiFetch('payments/admin', 'GET') as Promise<IPaymentsAdminListResponse>;
  }
};

export default PaymentsService;
