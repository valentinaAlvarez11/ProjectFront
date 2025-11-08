// app/(webpage)/room/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RoomDetails from '../../../../components/molecules/RoomDetailsComponent';
import { RoomInfo } from '../../../../interfaces/roomDetails';
import { sampleRooms } from '../../../../data/roomData'


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