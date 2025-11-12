// libs/auth.service.ts
import { apiFetch } from "@/utils/singletonFetch"; // Asume la ruta a tu fetch base
import { 
  IAuthResponse, 
  ILoginPayload, 
  IRegisterPayload, 
  IUserDetailResponse 
} from "@/interfaces/users"; 
import { IMessageResponse } from "@/interfaces/base";

const AuthService = {
  /**
   * Envía credenciales para iniciar sesión.
   * Endpoint: POST /users/login
   */
  login: async (data: ILoginPayload): Promise<IAuthResponse> => {
    return apiFetch('users/login', 'POST', data) as Promise<IAuthResponse>;
  },

  /**
   * Registra un nuevo usuario cliente.
   * Endpoint: POST /users/register
   */
  register: async (data: IRegisterPayload): Promise<IMessageResponse> => {
    return apiFetch('users/register', 'POST', data) as Promise<IMessageResponse>;
  },

  /**
   * Cierra sesión, pidiendo al backend que elimine la cookie.
   * Endpoint: POST /users/logout
   */
  logout: async (): Promise<IMessageResponse> => {
    return apiFetch('users/logout', 'POST') as Promise<IMessageResponse>;
  },

  /**
   * Verifica el estado de la sesión usando la cookie 'token' y obtiene los datos del usuario.
   * Endpoint: GET /users/status
   */
  checkStatus: async (): Promise<IUserDetailResponse> => {
    // La respuesta esperada es { usuario: IUser }
    return apiFetch('users/status', 'GET') as Promise<IUserDetailResponse>;
  }
};

export default AuthService;
