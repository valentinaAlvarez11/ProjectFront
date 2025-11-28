// components/organisms/RoomsPageContent.tsx
"use client";

import React from "react";
import RoomDetails from '@/components/molecules/roomDetailsComponent';
import { useRoom } from '@/hooks/useRoom';
import { states } from '@/utils/Tokens';

interface RoomsPageContentProps {
  roomId: number | null;
}

export default function RoomsPageContent({ roomId }: RoomsPageContentProps) {
  const { room, loading, error } = useRoom(roomId);

  return (
    <div className={states.roomPageContainer}>
      {loading && (
        <div className={states.loadingContainer}>
          <div className={states.loadingSpinner}></div>
          <p className={states.loadingMessage}>Cargando habitación...</p>
        </div>
      )}
      {!loading && room && (
        <RoomDetails room={room} />
      )}
      {!loading && !room && error && (
        <div className={states.errorContainer}>
          <div className={states.errorIcon}>⚠️</div>
          <p className={states.errorMessage}>{error}</p>
        </div>
      )}
    </div>
  );
}

