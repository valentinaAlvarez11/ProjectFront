// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IRoom } from '../../../../interfaces/rooms'; // Usar IRoom, no RoomInfo
import RoomsService from '@/libs/rooms.service'; // Asumiendo que esta es la ruta a tu servicio
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
      if (id === null || isNaN(id)) { // Manejar el caso donde el ID no es válido
        setLoading(false);
        setError("ID de habitación no válido.");
        return;
      }

      setLoading(true);
      setError("");

      const fetchRoom = async (roomId: number) => {
        try {
          const response = await RoomsService.getByIdPublic(roomId);
                
          setRoom(response.habitacion);
          setError("");
                
        } catch (err: any) {
          console.error("Error al cargar la habitación:", err);
          setRoom(null);
          const msg = err.status === 404 ? "Habitación no encontrada." : "Error de conexión con el servidor.";
          setError(msg);
                
        } finally {
          setLoading(false);
        }
      };
    fetchRoom(id);
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