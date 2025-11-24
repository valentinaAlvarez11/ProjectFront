// types/rooms.ts

export interface IRoomFeatures {
  tamano: string; 
  camas: string; 
  vista: string; 
  
  instalaciones: {
    wifi: boolean;
    television: boolean;
    aireAcondicionado: boolean;
    banoDucha: boolean;
    plancha: boolean;
    toallas: boolean;
    smartTV: boolean;
    refrigerador: boolean;
  };
}


// Entidad Habitación
export interface IRoom {
  id: number;
  numero: string;
  tipo: string;
  precio_noche: number;
  descripcion: string | null;
  disponible: boolean;
  caracteristicas: IRoomFeatures | string[] | null; // Puede ser objeto estructurado o array de strings
  imagenes: string[]; 
}


// Crear
export interface IRoomPayload {
  numero: string;
  tipo: string;
  precio_noche: number;
  descripcion: string | null;
  caracteristicas: IRoomFeatures | null;
  imagenes: string[];
}

// Actualización
export interface IRoomUpdatePayload extends IRoomPayload {
    disponible: boolean; 
}


// Respuestas
export interface IRoomDetailResponse {
    habitacion: IRoom;
}

export interface IRoomsListResponse {
    habitaciones: IRoom[];
}