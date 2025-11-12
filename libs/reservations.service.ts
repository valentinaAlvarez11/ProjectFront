// libs/reservations.service.ts
import { apiFetch } from "@/utils/singletonFetch"; 
import { IMessageResponse } from "@/interfaces/base";
import { 
    IReservation,
    IReservationAdmin,
    IReservationPayload,
    IReservationUpdatePayload,
    IReservationsListResponse,
    IReservationsAdminListResponse,
    IReservationCreateResponse
} from "@/interfaces/reservations"; 

const ReservationsService = {
  
  /**
   * Crea una nueva reserva para el usuario autenticado.
   * Endpoint: POST /reservations
   * La cookie 'token' se adjunta automáticamente.
   */
  createReservation: async (data: IReservationPayload): Promise<IReservationCreateResponse> => {
    return apiFetch('reservations', 'POST', data) as Promise<IReservationCreateResponse>;
  },

  /**
   * Obtiene todas las reservas hechas por el usuario autenticado.
   * Endpoint: GET /reservations/my
   */
  getMyReservations: async (): Promise<IReservationsListResponse> => {
    return apiFetch('reservations/my', 'GET') as Promise<IReservationsListResponse>;
  },

  /**
   * Obtiene todas las reservas del sistema (vista de administrador con JOINs).
   * Endpoint: GET /reservations/admin
   */
  getAllAdmin: async (): Promise<IReservationsAdminListResponse> => {
    return apiFetch('reservations/admin', 'GET') as Promise<IReservationsAdminListResponse>;
  },

  /**
   * Busca reservas por el ID de un usuario específico.
   * Endpoint: GET /reservations/admin/user/:userId
   */
  getByUserAdmin: async (userId: number): Promise<IReservationsAdminListResponse> => {
    return apiFetch(`reservations/admin/user/${userId}`, 'GET') as Promise<IReservationsAdminListResponse>;
  },
  
  /**
   * Busca reservas por el ID de una habitación específica.
   * Endpoint: GET /reservations/admin/room/:roomId
   */
  getByRoomAdmin: async (roomId: number): Promise<IReservationsAdminListResponse> => {
    return apiFetch(`reservations/admin/room/${roomId}`, 'GET') as Promise<IReservationsAdminListResponse>;
  },

  /**
   * Actualiza los datos de una reserva (Admin).
   * Endpoint: PUT /reservations/admin/:id
   */
  updateReservationAdmin: async (id: number, data: IReservationUpdatePayload): Promise<IMessageResponse> => {
    return apiFetch(`reservations/admin/${id}`, 'PUT', data) as Promise<IMessageResponse>;
  },

  /**
   * Elimina una reserva por su ID (Admin).
   * Endpoint: DELETE /reservations/admin/:id
   */
  deleteReservationAdmin: async (id: number): Promise<IMessageResponse> => {
    return apiFetch(`reservations/admin/${id}`, 'DELETE') as Promise<IMessageResponse>;
  }
};

export default ReservationsService;