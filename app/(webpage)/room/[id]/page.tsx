// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RoomDetails from '../../../../components/molecules/RoomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails';

// Datos de ejemplo con la nueva URL de la imagen y estructura
const sampleRooms: RoomInfo[] = [
  {
    id: "1",
    roomType: "ESTANDARD",
    images: ["https://www.cataloniahotels.com/es/blog/wp-content/uploads/2024/01/tipos-habitaciones-hotel.jpg"],
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
    images: ["https://www.cataloniahotels.com/es/blog/wp-content/uploads/2024/01/tipos-habitaciones-hotel.jpg"],
    size: "45 - 55 m²",
    bedDetails: "1x Cama King Size",
    view: "Vista al mar",
    description: "Espaciosa habitación con vistas privilegiadas y un baño de lujo.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Minibar", "Jacuzzi", "Baño con ducha", "Plancha y mesa de planchar", "Toallas", "Smart TV", "Refrigerador"],
    currentPrice: "650.000"
  },
];

const RoomPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");

    setTimeout(() => {
      const foundRoom = sampleRooms.find((r) => r.id === id);
      if (foundRoom) {
        setRoom(foundRoom);
        setError("");
      } else {
        setRoom(null);
        setError("Habitación no encontrada");
      }
      setLoading(false);
    }, 500);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {loading && <div className="text-center text-lg text-gray-600">Cargando habitación...</div>}
      {!loading && room && (
        <RoomDetails room={room} />
      )}
      {!loading && !room && error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}
    </div>
  );
};

export default RoomPage;