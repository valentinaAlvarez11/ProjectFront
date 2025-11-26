// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
<<<<<<< HEAD
import { IRoom } from '../../../../interfaces/rooms';
import RoomsService from '@/libs/rooms.service'; 
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';
=======
import Link from "next/link";
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails';
import LoadingState from '../../../../components/molecules/LoadingState';
import EmptyState from '../../../../components/molecules/EmptyState';
import PageContainer from '../../../../components/atoms/PageContainer';
import ButtonComponent from '../../../../components/atoms/ButtonComponent';
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a


const RoomPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;
  const [room, setRoom] = useState<IRoom | null>(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState<string>("");

  useEffect(() => {
      if (id === null || isNaN(id)) {
        setLoading(false);
        setError("ID de habitación no válido.");
        return;
=======
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
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
      }

      setLoading(true);
      setError("");

      const fetchRoom = async (roomId: number): Promise<{ habitacion: IRoom }> => {
        try {
          const response = await RoomsService.getByIdPublic(roomId);
          return response;
        } catch (err) {
          throw err;
        }
      };

      fetchRoom(id)
        .then(response => {
          setRoom(response.habitacion);
          setError("");
        })
        .catch(err => {
          console.error("Error al cargar la habitación:", err);
          setRoom(null);
          const msg = err.status === 404 ? "Habitación no encontrada." : "Error de conexión con el servidor.";
          setError(msg);
        })
        .finally(() => {
          setLoading(false);
        });
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