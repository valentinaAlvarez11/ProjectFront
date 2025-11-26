<<<<<<< HEAD
"use client";
=======
import React from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';
import SectionTitle from '@/components/molecules/SectionTitle';
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a

import React, { useEffect, useState } from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import { sectionTitle } from '@/utils/Tokens';

const RoomCards: React.FC = () => {
<<<<<<< HEAD
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

  // Función para obtener la primera imagen válida de una habitación
  const getRoomImage = (room: IRoom): string => {
    if (room.imagenes && room.imagenes.length > 0) {
      const firstImage = room.imagenes[0];
      if (firstImage && (firstImage.startsWith('http://') || firstImage.startsWith('https://'))) {
        return firstImage;
      }
    }
    // Imagen por defecto si no hay imagen válida
    return 'https://static.wixstatic.com/media/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg/v1/fill/w_367,h_473,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_9fe6e39a57a941e2880fdc852413a649~mv2.jpg';
  };

  // Función para obtener la descripción de una habitación
  const getRoomDescription = (room: IRoom): string => {
    if (room.descripcion) {
      return room.descripcion;
    }
    // Descripción por defecto basada en el tipo
    return `Habitación ${room.tipo} cómoda y acogedora.`;
  };

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
    <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="w-full max-w-[90vw] mx-auto mb-6 sm:mb-8">
        <hr className="border-none border-t-[4px] border-[#0a174e] mb-0.5" />
        <hr className="border-none border-t-[2px] border-[#0a174e] mt-0" />
      </div>
      <h2 className={`${sectionTitle}`}>
        HABITACIONES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto justify-items-center">
        {rooms.map((room) => (
          <RoomCardComponent
            key={room.id}
            id={room.id}
            type={room.tipo}
            description={getRoomDescription(room)}
            imageUrl={getRoomImage(room)}
          />
=======
  return (
    <div className="w-screen bg-white pb-10 text-center">
      <SectionTitle title="HABITACIONES" />
      <div className="flex justify-center gap-5 flex-wrap max-w-[1200px] mx-auto my-10">
        {roomCards.map((room) => (
          <RoomCardComponent key={room.id} {...room} />
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
        ))}
      </div>
    </div>
  );
};

export default RoomCards;
