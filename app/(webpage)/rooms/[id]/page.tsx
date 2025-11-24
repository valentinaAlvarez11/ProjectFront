// app/(webpage)/rooms/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IRoom } from '../../../../interfaces/rooms';
import RoomsService from '@/libs/rooms.service'; 
import RoomDetails from '../../../../components/molecules/roomDetailsComponent';


const RoomPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;
  const [room, setRoom] = useState<IRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
      if (id === null || isNaN(id)) {
        setLoading(false);
        setError("ID de habitación no válido.");
        return;
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


