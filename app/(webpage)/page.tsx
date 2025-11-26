"use client";

import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import ShowRoomCardsHorizontal from "@/components/organisms/ShowRoomCardsHorizontal";
import ComodidadesSection from "@/components/organisms/ComodidadesSection";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from 'react';

export default function HomePageClient() {
  const { isLoggedIn, loadingAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente esté montado antes de usar el estado de autenticación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar loading mientras se verifica la autenticación
  if (!mounted || loadingAuth) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg sm:text-xl lg:text-2xl text-[#0a174e]">Cargando...</p>
      </div>
    );
  }

  // Si el usuario está logueado, mostrar solo las habitaciones en formato horizontal
  if (isLoggedIn) {
    return (
      <div style={{ overflow: 'hidden' }}>
        <ShowRoomCardsHorizontal />
      </div>
    );
  }

  // Si no está logueado, mostrar el home normal
  return (
    <div style={{ overflow: 'hidden' }}>
      <CarrouselHomepage />
      <ComodidadesSection />
      <RoomCards />
    </div>
  );
}
