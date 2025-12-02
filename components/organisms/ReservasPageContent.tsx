"use client";

import React from 'react';
import ReservationForm from '@/components/molecules/ReservationForm';
import LoadingState from '@/components/atoms/LoadingState';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import PageContainer from '@/components/atoms/PageContainer';
import PageHeader from '@/components/atoms/PageHeader';
import { useReservas } from '@/hooks/useReservas';

export default function ReservasPageContent() {
  const {
    isLoading,
    canAccess,
    isSubmitting,
    errorMessage,
    successMessage,
    successModal,
    errorModal,
    handleSubmit,
    handleCancel,
  } = useReservas();

  if (isLoading) {
    return <LoadingState message="Cargando..." />;
  }

  if (!canAccess) {
    return null;
  }

  return (
    <>
      <PageContainer>
        <PageHeader
          title="Nueva Reserva"
          subtitle="Completa el formulario para crear una nueva reserva"
        />

        <ReservationForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={false}
          isLoading={isSubmitting}
          isAdmin={false}
        />
      </PageContainer>

      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={successModal.close}
        message={successMessage}
        autoCloseDelay={2000}
      />

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Error"
        message={errorMessage}
      />
    </>
  );
}

