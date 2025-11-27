// libs/users.service.ts
import { apiFetch } from "@/utils/singletonFetch"; 
import { IMessageResponse } from "@/interfaces/base" 
import { 
  IUser, 
  IAdminUpdateUserPayload,
  IUsersListResponse,
  IUserDetailResponse
} from "@/interfaces/users"; 

// Tipo para registro de usuario por admin (incluye contraseña y rol)
interface IAdminRegisterUserPayload {
  email: string;
  telefono: string;
  nombre: string;
  contraseña: string;
  rol: 'admin' | 'recepcionista' | 'cliente';
}

const UsersService = {

  // Registrar un usuario como admin

  register: async (data: IAdminRegisterUserPayload): Promise<IMessageResponse> => {
    return apiFetch('users/admin/register', 'POST', data) as Promise<IMessageResponse>;
  },

  // Obtiene todos los usuarios del sistema.

  getAllUsersAdmin: async (): Promise<IUsersListResponse> => {
    return apiFetch('users', 'GET') as Promise<IUsersListResponse>;
  },

  // Obtiene un usuario específico por su ID.

  getUserByIdAdmin: async (id: number): Promise<IUserDetailResponse> => {
    return apiFetch(`users/${id}`, 'GET') as Promise<IUserDetailResponse>;
  },

  /**
   * Actualiza los datos de un usuario existente.
   * @param id ID del usuario a actualizar
   * @param data Datos a modificar (incluye email, nombre, rol, y opcionalmente contraseña)
   */

  updateUserAdmin: async (id: number, data: IAdminUpdateUserPayload): Promise<IMessageResponse> => {
    return apiFetch(`users/${id}`, 'PUT', data) as Promise<IMessageResponse>;
  },

  // Elimina un usuario por su ID.

  deleteUserAdmin: async (id: number): Promise<IMessageResponse> => {
    return apiFetch(`users/${id}`, 'DELETE') as Promise<IMessageResponse>;
  }
};

export default UsersService;