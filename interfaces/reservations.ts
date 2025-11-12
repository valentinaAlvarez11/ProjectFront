// types/reservations.ts
import { IMessageResponse } from "./base"; 

// Reserva (Vista del Cliente: GET /reservations/my)
// Contiene solo los campos directos de la tabla 'reservas'.
export interface IReservation {
  id: number;
  habitacionId: number;
  usuarioId: number;
  fecha_inicio: string; 
  fecha_fin: string;    
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  precio_total: number;
}

// Reserva (Vista del Administrador: GET /reservations/admin)
// Incluye datos de las tablas JOIN: usuarios y habitaciones.
export interface IReservationAdmin extends IReservation {
  nombre_usuario: string;
  email_usuario: string;
  numero_habitacion: string;
}

// Crear una Reserva
export interface IReservationPayload {
  habitacionId: number;
  fecha_inicio: string; 
  fecha_fin: string;  
}

// Editar 
export interface IReservationUpdatePayload {
    habitacionId: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado: 'pendiente' | 'confirmada' | 'cancelada';
}


// Respuestas
export interface IReservationsListResponse {
    reservas: IReservation[];
}

export interface IReservationsAdminListResponse {
    reservas: IReservationAdmin[];
}

export interface IReservationCreateResponse extends IMessageResponse {
    id: number;
    precio_total: number;
}