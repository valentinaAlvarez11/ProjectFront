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
import { adminPage } from '@/utils/Tokens';
import { CreateReservationFormData } from '@/schemas/reservation';
import Modal from '@/components/atoms/Modal';

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
      await ReservationsService.createReservation({
        habitacionId: Number(data.habitacionId),
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
      });
      setSuccessMessage('Reserva creada exitosamente');
      successModal.open();
      setTimeout(() => {
        router.push('/mis-reservas');
      }, 2000);
    } catch (err: any) {
      console.error('Error al crear reserva:', err);
      setErrorMessage(err?.message || 'Error al crear la reserva');
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
      <div className={adminPage.container}>
        <div className={adminPage.contentWrapper}>
          <div className={adminPage.cardContainer}>
            <div className={adminPage.crudContainer}>
              <div className="mb-6">
                <h1 className={adminPage.crudTitle}>Nueva Reserva</h1>
                <p className={adminPage.crudSubtitle}>
                  Completa el formulario para crear una nueva reserva
                </p>
              </div>

              <ReservationForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={false}
                isLoading={isSubmitting}
                isAdmin={false}
              />
            </div>
          </div>
        </div>
      </div>

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

