"use client";

import React, { useEffect, useState } from 'react';
import RoomCardHorizontal from '@/components/molecules/RoomCardHorizontal';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import { sectionTitle } from '@/utils/Tokens';

const ShowRoomCardsHorizontal: React.FC = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await RoomsService.getAllPublic(true); // Solo habitaciones disponibles
        setRooms(response.habitaciones);
      } catch (err: any) {
        console.error('Error al cargar habitaciones:', err);
        setError('Error al cargar las habitaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center">
        <p className="text-lg sm:text-xl lg:text-2xl text-[#0a174e]">Cargando habitaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center">
        <p className="text-lg sm:text-xl lg:text-2xl text-red-600">{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 text-center">
        <p className="text-lg sm:text-xl lg:text-2xl text-[#0a174e]">No hay habitaciones disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[90vw] mx-auto mb-6 sm:mb-8">
        <hr className="border-none border-t-[4px] border-[#0a174e] mb-0.5" />
        <hr className="border-none border-t-[2px] border-[#0a174e] mt-0" />
      </div>
      <h2 className={`${sectionTitle} text-center mb-8 sm:mb-12`}>
        HABITACIONES
      </h2>
      <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <RoomCardHorizontal
            key={room.id}
            room={room}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowRoomCardsHorizontal;

