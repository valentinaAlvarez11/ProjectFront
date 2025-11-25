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
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="text-center py-12 sm:py-16">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-[#0a1445] mx-auto mb-4"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Cargando habitación...</p>
        </div>
      )}
      {!loading && room && (
        <RoomDetails room={room} />
      )}
      {!loading && !room && error && (
        <div className="text-center py-12 sm:py-16">
          <div className="text-4xl sm:text-5xl mb-4">⚠️</div>
          <p className="text-base sm:text-lg lg:text-xl text-red-600 font-semibold px-4">{error}</p>
        </div>
      )}
    </div>
  );
};

export default RoomPage;


