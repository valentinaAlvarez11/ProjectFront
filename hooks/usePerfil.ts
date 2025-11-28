// hooks/usePerfil.ts
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export const usePerfil = () => {
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

  const canAccess = isLoggedIn && !!user;

  return {
    loadingAuth,
    canAccess,
    user,
  };
};

