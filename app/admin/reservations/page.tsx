"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsCRUD from '@/components/organisms/ReservationsCRUD';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorModal from '@/components/molecules/ErrorModal';
import { useModal } from '@/hooks/useModal';

const ReservationsPage = () => {
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
    }
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin' && user?.rol !== 'recepcionista') {
      setErrorMessage('Acceso denegado. Solo el personal autorizado puede acceder a esta página.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [loadingAuth, isLoggedIn, user, router, errorModal]);

  if (loadingAuth) {
    return <LoadingState message="Verificando autenticación..." />;
  }

  if (!isLoggedIn || (user?.rol !== 'admin' && user?.rol !== 'recepcionista')) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <ReservationsCRUD />
      </div>

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Acceso Denegado"
        message={errorMessage}
      />
    </>
  );
};

export default ReservationsPage;

