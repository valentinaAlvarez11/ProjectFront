// hooks/useHomePage.ts
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from "@/store/authStore";

export type HomeViewType = 'loading' | 'admin' | 'recepcionista' | 'loggedIn' | 'guest';

export const useHomePage = () => {
  const { isLoggedIn, loadingAuth, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente esté montado antes de usar el estado de autenticación
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = !mounted || loadingAuth;
  const isAdmin = isLoggedIn && user?.rol === 'admin';
  const isRecepcionista = isLoggedIn && user?.rol === 'recepcionista';

  // Lógica de decisión: determinar qué tipo de vista mostrar
  const viewType = useMemo((): HomeViewType => {
    if (isLoading) return 'loading';
    if (isAdmin) return 'admin';
    if (isRecepcionista) return 'recepcionista';
    if (isLoggedIn) return 'loggedIn';
    return 'guest';
  }, [isLoading, isAdmin, isRecepcionista, isLoggedIn]);

  return {
    viewType,
    isLoading,
    isAdmin,
    isLoggedIn,
    user,
  };
};

