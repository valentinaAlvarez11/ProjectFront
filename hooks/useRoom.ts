// hooks/useRoom.ts
"use client";

import { useEffect, useState } from "react";
import { IRoom } from "@/interfaces/rooms";
import RoomsService from "@/libs/rooms.service";

export const useRoom = (id: number | null) => {
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

  return { room, loading, error };
};

