// hooks/useHomePage.ts
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from "@/store/authStore";

export type HomeViewType = 'loading' | 'admin' | 'loggedIn' | 'guest';

export const useHomePage = () => {
  const { isLoggedIn, loadingAuth, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Asegurar que el componente esté montado antes de usar el estado de autenticación
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = !mounted || loadingAuth;
  const isAdmin = isLoggedIn && user?.rol === 'admin';

  // Lógica de decisión: determinar qué tipo de vista mostrar
  const viewType = useMemo((): HomeViewType => {
    if (isLoading) return 'loading';
    if (isAdmin) return 'admin';
    if (isLoggedIn) return 'loggedIn';
    return 'guest';
  }, [isLoading, isAdmin, isLoggedIn]);

  return {
    viewType,
    isLoading,
    isAdmin,
    isLoggedIn,
    user,
  };
};

