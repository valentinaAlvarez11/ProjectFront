"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';

export const useAdminReservations = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin' && user?.rol !== 'recepcionista') {
      setErrorMessage('Acceso denegado. Solo el personal autorizado puede acceder a esta página.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
      return;
    }
  }, [loadingAuth, isLoggedIn, user, router, errorModal]);

  const canAccess = isLoggedIn && (user?.rol === 'admin' || user?.rol === 'recepcionista');

  return {
    loadingAuth,
    isLoggedIn,
    user,
    canAccess,
    errorModal,
    errorMessage,
  };
};

