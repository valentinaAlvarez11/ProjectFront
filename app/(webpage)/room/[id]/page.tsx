// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails';
import LoadingState from '../../../../components/molecules/LoadingState';
import EmptyState from '../../../../components/molecules/EmptyState';
import PageContainer from '../../../../components/atoms/PageContainer';

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
    <PageContainer>
      <LoadingState isLoading={loading} loadingText="Cargando habitación...">
        {error ? (
          <EmptyState
            title="Habitación no encontrada"
            description={error}
            icon={<span className="text-6xl">🏨</span>}
          />
        ) : room ? (
          <RoomDetails room={room} />
        ) : null}
      </LoadingState>
    </PageContainer>
  );
};

export default RoomPage;