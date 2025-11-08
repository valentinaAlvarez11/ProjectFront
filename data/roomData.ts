// data/roomData
import { RoomInfo } from '../interfaces/roomDetails';

export const sampleRooms: RoomInfo[] = [
  {
    id: "1",
    roomType: "ESTANDARD",
    images: "https://www.cataloniahotels.com/es/blog/wp-content/uploads/2024/01/tipos-habitaciones-hotel.jpg",
    size: "30 - 38 m²",
    bedDetails: "1x Cama Doble",
    view: "Vista a la ciudad",
    description: "Cómodas y amplias habitaciones con cama doble o twin.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Baño con ducha", "Plancha y mesa de planchar", "Toallas", "Smart TV", "Refrigerador"],
    currentPrice: "373.296"
  },
  {
    id: "2",
    roomType: "DELUXE",
    images: "https://www.cataloniahotels.com/es/blog/wp-content/uploads/2024/01/tipos-habitaciones-hotel.jpg",
    size: "45 - 55 m²",
    bedDetails: "1x Cama King Size",
    view: "Vista al mar",
    description: "Espaciosa habitación con vistas privilegiadas y un baño de lujo.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Minibar", "Jacuzzi", "Baño con ducha", "Plancha y mesa de planchar", "Toallas", "Smart TV", "Refrigerador"],
    currentPrice: "650.000"
  },
  {
    id: "3",
    roomType: "SUITE",
    images: "https://hips.hearstapps.com/hmg-prod/images/habitacion-de-hotel-con-terraza-y-vistas-al-mar-1582215284.jpg",
    size: "70 - 90 m²",
    bedDetails: "1x Cama King Size + Sala de Estar separada",
    view: "Vistas Panorámicas",
    description: "Lujosa suite con área de estar separada, comedor y balcón privado con vistas impresionantes.",
    amenities: ["Wi-Fi Premium", "Aire acondicionado central", "2x Televisión", "Minibar", "Jacuzzi", "Cafetera Espresso", "Servicio de cobertura", "Caja fuerte", "Escritorio ejecutivo", "Refrigerador"],
    currentPrice: "1.200.000"
  },
  {
    id: "4",
    roomType: "FAMILIAR",
    images: "https://media.revistagq.com/photos/63e1730048e945c792440939/master/w_1600%2Cc_limit/habitacion-familiar-hotel.jpg",
    size: "50 - 65 m²",
    bedDetails: "1x Cama Doble + 2x Camas Individuales",
    view: "Vista al jardín o piscina",
    description: "Ideal para familias, con espacio suficiente y camas separadas para la comodidad de todos.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Nevera pequeña", "Zona de juegos para niños (bajo petición)", "Baño con bañera", "Toallas", "Smart TV", "Microondas (bajo petición)"],
    currentPrice: "550.000"
  },
  {
    id: "5",
    roomType: "DOBLE TWIN",
    images: "https://img.freepik.com/foto-gratis/interior-dormitorio-hotel-moderno_1268-2323.jpg",
    size: "30 - 35 m²",
    bedDetails: "2x Camas Individuales",
    view: "Vista interior (Tranquila)",
    description: "Habitación funcional y cómoda con dos camas separadas, perfecta para viajes de negocios o amigos.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Baño con ducha", "Escritorio", "Toallas", "Secador de pelo"],
    currentPrice: "350.000"
  },
  {
    id: "6",
    roomType: "EJECUTIVA",
    images: "https://i.pinimg.com/originals/a0/0b/99/a00b991b58535492d37c98028f090d81.jpg",
    size: "40 - 48 m²",
    bedDetails: "1x Cama Queen Size",
    view: "Vista a la ciudad (Piso alto)",
    description: "Diseñada para el viajero de negocios, incluye una amplia zona de trabajo y acceso a servicios ejecutivos.",
    amenities: ["Wi-Fi de alta velocidad", "Aire acondicionado", "Smart TV 50''", "Minibar", "Sillón ergonómico", "Cafetera Nespresso", "Plancha y tabla de planchar", "Baño con amenidades premium"],
    currentPrice: "750.000"
  },
  {
    id: "7",
    roomType: "ESTUDIO",
    images: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/330559775.jpg?k=b4e34151a6602e1c31273934d70b7410884617df20b0058b8882b5409a632128&o=&hp=1",
    size: "55 - 65 m²",
    bedDetails: "1x Cama Doble + Cocineta",
    view: "Vista a la ciudad con balcón",
    description: "Apartamento tipo estudio ideal para estancias largas, con una pequeña cocina equipada y sala de estar.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Cocina equipada (microondas, nevera, utensilios)", "Zona de comedor", "Baño con ducha", "Servicio de lavandería (opcional)"],
    currentPrice: "850.000"
  },
  {
    id: "8",
    roomType: "PRESIDENCIAL",
    images: "https://www.hotelesentv.com/wp-content/uploads/2021/08/penthouse-suite-presidencial-mandarin-oriental-las-vegas-hab-1-800x600.jpg",
    size: "150 - 200 m²",
    bedDetails: "1x Cama King Size Súper Lujo + Vestidor",
    view: "Vistas 360º de la ciudad",
    description: "El máximo lujo y exclusividad. Incluye sala de reuniones, mayordomo privado y jacuzzi exterior.",
    amenities: ["Wi-Fi Ultra-rápido", "Sistema de sonido envolvente", "3x Televisores", "Bar privado", "Servicio de mayordomo 24h", "Jacuzzi", "Ducha de efecto lluvia", "Gimnasio privado", "Traslados incluidos"],
    currentPrice: "5.000.000"
  }
];
