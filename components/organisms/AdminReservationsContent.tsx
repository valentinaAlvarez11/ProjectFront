"use client";

import React from 'react';
import ReservationsCRUD from '@/components/organisms/ReservationsCRUD';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorModal from '@/components/molecules/ErrorModal';
import { UseModalReturn } from '@/hooks/useModal';

interface AdminReservationsContentProps {
  loadingAuth: boolean;
  isLoggedIn: boolean;
  user: { rol: string } | null;
  canAccess: boolean;
  errorModal: UseModalReturn;
  errorMessage: string;
}

const AdminReservationsContent: React.FC<AdminReservationsContentProps> = ({
  loadingAuth,
  isLoggedIn,
  user,
  canAccess,
  errorModal,
  errorMessage,
}) => {
  if (loadingAuth) {
    return <LoadingState message="Verificando autenticación..." />;
  }

  if (!canAccess) {
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

export default AdminReservationsContent;

