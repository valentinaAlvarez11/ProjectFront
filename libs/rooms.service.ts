// libs/rooms.service.ts
import { apiFetch } from "@/utils/singletonFetch"; 
import { IMessageResponse } from "@/interfaces/base";
import { 
    IRoom,
    IRoomPayload,
    IRoomUpdatePayload,
    IRoomDetailResponse,
    IRoomsListResponse
} from "@/interfaces/rooms"; 

const RoomsService = {
  
  /**
   * Obtiene habitaciones disponibles, o todas si no se especifica el filtro.
   * @param disponible Filtro opcional: si se omite, trae todo lo que no esté marcado explícitamente como false en la consulta del backend.
   */
  getAllPublic: async (disponible?: boolean): Promise<IRoomsListResponse> => {
    let endpoint = 'rooms';
    
    if (disponible !== undefined) {
      endpoint += `?disponible=${disponible}`;
    }

    return apiFetch(endpoint, 'GET') as Promise<IRoomsListResponse>;
  },

  // Obtiene una habitación específica por su ID.
  
  getByIdPublic: async (id: number): Promise<IRoomDetailResponse> => {
    return apiFetch(`rooms/${id}`, 'GET') as Promise<IRoomDetailResponse>;
  },

  // Obtiene TODAS las habitaciones del sistema (sin filtro de disponibilidad).

  getAllAdmin: async (): Promise<IRoomsListResponse> => {
    return apiFetch('rooms', 'GET') as Promise<IRoomsListResponse>;
  },

  // Crea una nueva habitación.

  createRoom: async (data: IRoomPayload): Promise<IMessageResponse & { id: number }> => {
    return apiFetch('rooms', 'POST', data) as Promise<IMessageResponse & { id: number }>;
  },

  /**
   * Actualiza los datos de una habitación existente.
   * @param id ID de la habitación a actualizar
   * @param data Datos de la habitación (requiere TODOS los campos definidos en IRoomUpdatePayload)
   */
  updateRoom: async (id: number, data: IRoomUpdatePayload): Promise<IMessageResponse> => {
    return apiFetch(`rooms/${id}`, 'PUT', data) as Promise<IMessageResponse>;
  },

  // Elimina una habitación por su ID.

  deleteRoom: async (id: number): Promise<IMessageResponse> => {
    return apiFetch(`rooms/${id}`, 'DELETE') as Promise<IMessageResponse>;
  }
};

export default RoomsService;