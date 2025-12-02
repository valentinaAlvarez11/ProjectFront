"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export const useGestiones = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
      return;
    }

    if (!loadingAuth && isLoggedIn && user?.rol !== 'cliente') {
      router.push('/');
      return;
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  const canAccess = isLoggedIn && user?.rol === 'cliente';
  const isLoading = loadingAuth;

  return {
    isLoading,
    canAccess,
  };
};

