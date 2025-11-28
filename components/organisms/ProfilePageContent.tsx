// components/organisms/ProfilePageContent.tsx
"use client";

import React from 'react';
import ProfileComponent from '@/components/organisms/ProfileComponent';
import LoadingState from '@/components/atoms/LoadingState';
import { usePerfil } from '@/hooks/usePerfil';

export default function ProfilePageContent() {
  const { loadingAuth, canAccess, user } = usePerfil();

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return <LoadingState message="Cargando perfil..." />;
  }

  // Si no está autenticado, no mostrar el contenido
  if (!canAccess || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileComponent user={user} />
    </div>
  );
}

