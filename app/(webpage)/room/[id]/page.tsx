// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails';
import LoadingState from '../../../../components/molecules/LoadingState';
import EmptyState from '../../../../components/molecules/EmptyState';
import PageContainer from '../../../../components/atoms/PageContainer';
import ButtonComponent from '../../../../components/atoms/ButtonComponent';

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
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setNotFound(false);

    setTimeout(() => {
      const foundRoom = sampleRooms.find((r) => r.id === id);
      if (foundRoom) {
        setRoom(foundRoom);
      } else {
        setRoom(null);
        setNotFound(true);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (notFound && !loading) {
    return (
      <PageContainer>
        <EmptyState
          title="Habitación no encontrada"
          description="Lo sentimos, la habitación que buscas no existe o ha sido eliminada."
          icon={<span className="text-6xl">🏨</span>}
          action={
            <Link href="/">
              <ButtonComponent variant="primary">
                Volver al inicio
              </ButtonComponent>
            </Link>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LoadingState isLoading={loading} loadingText="Cargando habitación...">
        {room ? (
          <RoomDetails room={room} />
        ) : null}
      </LoadingState>
    </PageContainer>
  );
};

export default RoomPage;