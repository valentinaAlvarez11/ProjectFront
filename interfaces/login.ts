import { UserWithRoles } from "./user";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: UserWithRoles;
}