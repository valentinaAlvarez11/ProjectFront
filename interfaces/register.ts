export type RegisterFormData = {
  email: string;
  phone: string;
  name: string;
  password: string;
  acceptSMS: boolean;
  acceptTerms: boolean;
};

export interface RegisterDTO {
  email: string;
  telefono: string;
  nombre: string;
  contraseña: string;
}

export interface RegisterResponse {
  mensaje: string;
  usuario: {
    email: string;
    telefono: string;
    nombre: string;
    rol_comprador: boolean;
    rol_vendedor: boolean;
  };
}


