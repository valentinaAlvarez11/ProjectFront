// hooks/useAdminDashboard.ts
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';

export const useAdminDashboard = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Verificar estado de autenticación al cargar
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // Si está autenticado pero no es admin, mostrar mensaje de error
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin') {
      setErrorMessage('Acceso denegado. Solo los administradores pueden acceder a esta página.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [loadingAuth, isLoggedIn, user, router, errorModal]);

  const canAccess = isLoggedIn && user?.rol === 'admin';

  return {
    loadingAuth,
    canAccess,
    errorModal,
    errorMessage,
  };
};

