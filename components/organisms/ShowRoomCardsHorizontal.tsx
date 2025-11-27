"use client";

import React, { useEffect, useState } from 'react';
import RoomCardHorizontal from '@/components/molecules/RoomCardHorizontal';
import RoomsService from '@/libs/rooms.service';
import { IRoom } from '@/interfaces/rooms';
import SectionContainer from '@/components/atoms/SectionContainer';
import SectionTitle from '@/components/atoms/SectionTitle';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorState from '@/components/atoms/ErrorState';
import EmptyState from '@/components/atoms/EmptyState';
import { spacing } from '@/utils/Tokens';

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
      <div className={`flex flex-col ${spacing.gap.large} max-w-7xl mx-auto`}>
        {rooms.map((room) => (
          <RoomCardHorizontal
            key={room.id}
            room={room}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ShowRoomCardsHorizontal;

