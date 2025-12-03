"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePago } from '@/hooks/usePago';
import PagoContent from '@/components/organisms/PagoContent';
import LoadingState from '@/components/atoms/LoadingState';

function PagoPageContent() {
  const searchParams = useSearchParams();
  const {
    loadingAuth,
    isLoggedIn,
    user,
    canAccess,
    isLoading,
    isDataReady,
    isSubmitting,
    loading,
    reservationData,
    roomData,
    monto,
    nights,
    successModal,
    errorModal,
    successMessage,
    errorMessage,
    handlePaymentSubmit,
    handleCancel,
  } = usePago(searchParams);

  return (
    <PagoContent
      loadingAuth={loadingAuth}
      isLoggedIn={isLoggedIn}
      user={user}
      canAccess={canAccess}
      isLoading={isLoading}
      isDataReady={isDataReady}
      isSubmitting={isSubmitting}
      loading={loading}
      reservationData={reservationData}
      roomData={roomData}
      monto={monto}
      nights={nights}
      successModal={successModal}
      errorModal={errorModal}
      successMessage={successMessage}
      errorMessage={errorMessage}
      handlePaymentSubmit={handlePaymentSubmit}
      handleCancel={handleCancel}
    />
  );
}

export default function PagoPage() {
  return (
    <Suspense fallback={<LoadingState message="Cargando..." />}>
      <PagoPageContent />
    </Suspense>
  );
}
