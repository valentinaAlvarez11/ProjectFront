// components/organisms/HomePageContent.tsx
"use client";

import React from 'react';
import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import ShowRoomCardsHorizontal from "@/components/organisms/ShowRoomCardsHorizontal";
import ComodidadesSection from "@/components/organisms/ComodidadesSection";
import AdminHome from "@/components/organisms/AdminHome";
import RecepcionistaHome from "@/components/organisms/RecepcionistaHome";
import LoadingState from '@/components/atoms/LoadingState';
import { useHomePage } from '@/hooks/useHomePage';

export default function HomePageContent() {
  const { viewType } = useHomePage();

  // El componente solo mapea el tipo de vista al JSX correspondiente
  switch (viewType) {
    case 'loading':
      return <LoadingState message="Cargando..." />;
    
    case 'admin':
      return <AdminHome />;
    
    case 'recepcionista':
      return <RecepcionistaHome />;
    
    case 'loggedIn':
      return (
        <div style={{ overflow: 'hidden' }}>
          <ShowRoomCardsHorizontal />
        </div>
      );
    
    case 'guest':
    default:
      return (
        <div style={{ overflow: 'hidden' }}>
          <CarrouselHomepage />
          <ComodidadesSection />
          <RoomCards />
        </div>
      );
  }
}

