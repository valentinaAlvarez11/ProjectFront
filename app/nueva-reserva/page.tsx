"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationForm from '@/components/molecules/ReservationForm';
import ReservationsService from '@/libs/reservations.service';
import LoadingState from '@/components/atoms/LoadingState';
import SuccessModal from '@/components/molecules/SuccessModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import { useModal } from '@/hooks/useModal';
import { CreateReservationFormData } from '@/schemas/reservation';
import PageContainer from '@/components/atoms/PageContainer';
import PageHeader from '@/components/atoms/PageHeader';

export default function NuevaReservaPage() {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const successModal = useModal();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
    } else if (!loadingAuth && isLoggedIn && user?.rol !== 'cliente') {
      router.push('/');
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  const handleSubmit = async (data: CreateReservationFormData) => {
    try {
      setIsSubmitting(true);
      // Debug: Ver qué fechas se están enviando
      console.log('📅 Fechas recibidas del formulario:', {
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        tipo_inicio: typeof data.fecha_inicio,
        tipo_fin: typeof data.fecha_fin,
      });
      
      const payload = {
        habitacionId: Number(data.habitacionId),
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
      };
      
      console.log('📤 Payload que se guardará para el pago:', payload);
      
      // Guardar los datos de la reserva en sessionStorage para la página de pago
      sessionStorage.setItem('pendingReservation', JSON.stringify(payload));
      
      // Redirigir a la página de pago
      router.push(`/pago?habitacionId=${payload.habitacionId}&fecha_inicio=${payload.fecha_inicio}&fecha_fin=${payload.fecha_fin}`);
    } catch (err: any) {
      console.error('Error al preparar el pago:', err);
      setErrorMessage(err?.message || 'Error al preparar el pago');
      errorModal.open();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/gestiones');
  };

  if (loadingAuth) {
    return <LoadingState message="Cargando..." />;
  }

  if (!isLoggedIn || user?.rol !== 'cliente') {
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

