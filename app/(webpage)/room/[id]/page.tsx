// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails'; // Importamos la interfaz actualizada

const sampleRooms: RoomInfo[] = [
  {
    id: "1",
    roomType: "ESTANDARD",
    images: ["https://i.imgur.com/eDty1uX.jpeg", "https://i.imgur.com/qR56k9N.jpeg"],
    size: "30 - 38 m²",
    bedDetails: "1x Cama Doble",
    view: "Vista a la ciudad",
    description: "Cómodas y amplias habitaciones con cama doble o twin.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión"],
    currentPrice: "373.296"
  },
  {
    id: "2",
    roomType: "DELUXE",
    images: ["https://i.imgur.com/gK96v7u.jpeg", "https://i.imgur.com/h5vYp5l.jpeg"],
    size: "45 - 55 m²",
    bedDetails: "1x Cama King Size",
    view: "Vista al mar",
    description: "Espaciosa habitación con vistas privilegiadas y un baño de lujo.",
    amenities: ["Wi-Fi", "Aire acondicionado", "Televisión", "Minibar", "Jacuzzi"],
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

    // Simulación de la llamada a la API
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
    }, 500); // Simulamos un retraso de 500ms
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