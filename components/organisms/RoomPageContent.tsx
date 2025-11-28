// components/organisms/RoomPageContent.tsx
"use client";

import React from "react";
import RoomDetails from '@/components/molecules/roomDetailsComponent';
import { useRoom } from '@/hooks/useRoom';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorState from '@/components/atoms/ErrorState';

interface RoomPageContentProps {
  roomId: number | null;
}

export default function RoomPageContent({ roomId }: RoomPageContentProps) {
  const { room, loading, error } = useRoom(roomId);

  if (loading) {
    return <LoadingState message="Cargando habitación..." />;
  }

  if (error || !room) {
    return <ErrorState message={error || "Habitación no encontrada"} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <RoomDetails room={room} />
    </div>
  );
}

