import { IMessageResponse } from "./base";

// Entidad Usuario
export interface IUser {
  id: number;
  email: string;
  nombre: string;
  rol: 'admin' | 'recepcionista' | 'cliente';
  telefono: string;
}

// Login
export interface ILoginPayload {
  email: string;
  contraseña: string;
}

// Registro
export interface IRegisterPayload extends ILoginPayload {
  telefono: string;
  nombre: string;
}

// Edición de Usuario
export interface IAdminUpdateUserPayload extends Partial<Omit<IUser, 'id'>> {
    contraseña?: string;
}


// Respuestas específicas
export interface IAuthResponse extends IMessageResponse {
  usuario: IUser;
}

export interface IUsersListResponse {
    usuarios: IUser[];
}

export interface IUserDetailResponse {
    usuario: IUser;
}