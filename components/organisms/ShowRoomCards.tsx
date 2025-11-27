"use client";

import React, { useEffect, useState } from 'react';
import RoomCardComponent from '@/components/molecules/RoomCardsComponent';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import SectionContainer from '@/components/atoms/SectionContainer';
import SectionTitle from '@/components/atoms/SectionTitle';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorState from '@/components/atoms/ErrorState';
import EmptyState from '@/components/atoms/EmptyState';
import { grids } from '@/utils/Tokens';

const RoomCards: React.FC = () => {
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
    return <LoadingState message="Cargando habitaciones..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (rooms.length === 0) {
    return <EmptyState message="No hay habitaciones disponibles en este momento." />;
  }

  return (
    <SectionContainer>
      <SectionTitle title="HABITACIONES" />
      <div className={grids.rooms}>
        {rooms.map((room) => (
          <RoomCardComponent
            key={room.id}
            id={room.id}
            type={room.tipo}
            description={getRoomDescription(room)}
            imageUrl={getRoomImage(room)}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default RoomCards;
