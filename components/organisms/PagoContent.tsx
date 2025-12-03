"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PaymentForm from '@/components/molecules/PaymentForm';
import LoadingState from '@/components/atoms/LoadingState';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import PageContainer from '@/components/atoms/PageContainer';
import PageHeader from '@/components/atoms/PageHeader';
import { UseModalReturn } from '@/hooks/useModal';
import { PaymentFormData } from '@/schemas/payment';
import { IRoom } from '@/interfaces/rooms';

interface ReservationData {
  habitacionId: number;
  fecha_inicio: string;
  fecha_fin: string;
}

interface PagoContentProps {
  loadingAuth: boolean;
  isLoggedIn: boolean;
  user: { rol: string } | null;
  canAccess: boolean;
  isLoading: boolean;
  isDataReady: boolean;
  isSubmitting: boolean;
  loading: boolean;
  reservationData: ReservationData | null;
  roomData: IRoom | null;
  monto: number;
  nights: number;
  successModal: UseModalReturn;
  errorModal: UseModalReturn;
  successMessage: string;
  errorMessage: string;
  handlePaymentSubmit: (paymentData: PaymentFormData) => Promise<void>;
  handleCancel: () => void;
}

const PagoContent: React.FC<PagoContentProps> = ({
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
}) => {
  if (isLoading) {
    return <LoadingState message="Cargando..." />;
  }

  if (!canAccess) {
    return null;
  }

  if (!isDataReady) {
    return <LoadingState message="Cargando datos de reserva..." />;
  }

  return (
    <>
      <PageContainer>
        <PageHeader
          title="Procesar Pago"
          subtitle="Complete los datos de su tarjeta para finalizar la reserva"
        />

        <PaymentForm
          onSubmit={handlePaymentSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          monto={monto}
          reservationData={{
            habitacionId: reservationData!.habitacionId,
            fecha_inicio: reservationData!.fecha_inicio,
            fecha_fin: reservationData!.fecha_fin,
            precioPorNoche: roomData!.precio_noche,
            nights: nights,
          }}
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
};

export default PagoContent;

