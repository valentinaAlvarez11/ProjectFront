import { UserWithRoles } from "./user";

export interface LoginDTO {
  email: string
  contraseña: string
}

export interface LoginResponse {
  token: string
  usuario: UserWithRoles
}