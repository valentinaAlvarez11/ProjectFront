"use client";

import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import ShowRoomCardsHorizontal from "@/components/organisms/ShowRoomCardsHorizontal";
import ComodidadesSection from "@/components/organisms/ComodidadesSection";
import AdminHome from "@/components/organisms/AdminHome";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from 'react';
import LoadingState from '@/components/atoms/LoadingState';

export default function HomePageClient() {
  const { isLoggedIn, loadingAuth, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente esté montado antes de usar el estado de autenticación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar loading mientras se verifica la autenticación
  if (!mounted || loadingAuth) {
    return <LoadingState message="Cargando..." />;
  }

  // Si el usuario es administrador, mostrar el home de administrador
  if (isLoggedIn && user?.rol === 'admin') {
    return <AdminHome />;
  }

  // Si el usuario está logueado (pero no es admin), mostrar solo las habitaciones en formato horizontal
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
