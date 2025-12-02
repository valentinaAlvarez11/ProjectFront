"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';
import { CreateReservationFormData } from '@/schemas/reservation';

export const useNuevaReserva = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successModal = useModal();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const canAccess = isLoggedIn && user?.rol === 'cliente';
  const isLoading = loadingAuth;

  return {
    isLoading,
    canAccess,
    isSubmitting,
    errorMessage,
    successMessage,
    successModal,
    errorModal,
    handleSubmit,
    handleCancel,
  };
};

