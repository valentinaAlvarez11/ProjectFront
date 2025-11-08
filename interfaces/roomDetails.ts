// interfaces/room.ts o donde lo vayas a usar en tu frontend
export interface RoomInfo {
  id: string; // Identificador único de la habitación.
  roomType: string; // Tipo de cuarto (ej. "Estandar", "Deluxe").
  images: string; // Un array de URLs para las imágenes de la habitación.
  size: string; // El tamaño en metros cuadrados (ej. "30 - 38 m²").
  bedDetails: string; // Descripción de las camas (ej. "1 doble y 2 sencillas").
  view: string; // Hacia dónde tiene vista la habitación (ej. "Vista a la ciudad").
  description: string; // Una breve descripción de la habitación.
  amenities: string[]; // Lista de detalles y comodidades (ej. "Aire acondicionado", "Nevera").
  currentPrice: string; // El precio actual (ej. "373.296").
}