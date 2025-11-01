import { apiFetch } from "./singletonFetch"
import { LoginDTO, LoginResponse } from "@/interfaces/login"
import { RegisterFormData, RegisterDTO, RegisterResponse } from "@/interfaces/register";

class AuthService {
  async login(body: LoginDTO): Promise<LoginResponse> {
    return apiFetch('/login', 'POST', body) as Promise<LoginResponse>;
  }

  async register(data: RegisterFormData): Promise<RegisterResponse> {
    // Mapear datos del formulario al formato del backend
    const registerData: RegisterDTO = {
      email: data.email,
      telefono: data.phone,
      nombre: data.name,
      contraseña: data.password,
    };
    
    return apiFetch('/register', 'POST', registerData) as Promise<RegisterResponse>;
  }
}

export const authService = new AuthService();