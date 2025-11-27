"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ProfileComponent from '@/components/organisms/ProfileComponent';
import LoadingState from '@/components/atoms/LoadingState';

export default function PerfilPage() {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // Verificar estado de autenticación al cargar
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
    }
  }, [loadingAuth, isLoggedIn, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return <LoadingState message="Cargando perfil..." />;
  }

  // Si no está autenticado, no mostrar el contenido
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileComponent user={user} />
    </div>
  );
}

