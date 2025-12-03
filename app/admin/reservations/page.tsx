"use client";

import React from 'react';
import { useAdminReservations } from '@/hooks/useAdminReservations';
import AdminReservationsContent from '@/components/organisms/AdminReservationsContent';

const ReservationsPage = () => {
  const {
    loadingAuth,
    isLoggedIn,
    user,
    canAccess,
    errorModal,
    errorMessage,
  } = useAdminReservations();

  return (
    <AdminReservationsContent
      loadingAuth={loadingAuth}
      isLoggedIn={isLoggedIn}
      user={user}
      canAccess={canAccess}
      errorModal={errorModal}
      errorMessage={errorMessage}
    />
  );
};

export default ReservationsPage;

