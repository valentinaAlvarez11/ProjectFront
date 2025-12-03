"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import PaymentsService from '@/libs/payments.service';
import ReservationsService from '@/libs/reservations.service';
import RoomsService from '@/libs/rooms.service';
import { useModal } from '@/hooks/useModal';
import { PaymentFormData } from '@/schemas/payment';
import { IRoom } from '@/interfaces/rooms';

interface ReservationData {
  habitacionId: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export const usePago = (searchParams: ReadonlyURLSearchParams) => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [roomData, setRoomData] = useState<IRoom | null>(null);
  const [monto, setMonto] = useState(0);
  const [nights, setNights] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
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

  useEffect(() => {
    const loadReservationData = async () => {
      // Evitar múltiples ejecuciones
      if (hasLoaded || loadingAuth || !isLoggedIn || user?.rol !== 'cliente') {
        return;
      }

      try {
        setLoading(true);
        setHasLoaded(true);
        
        // Obtener datos de la reserva desde los parámetros de la URL o sessionStorage
        let data: ReservationData | null = null;
        
        // Intentar obtener desde URL params
        const habitacionId = searchParams.get('habitacionId');
        const fecha_inicio = searchParams.get('fecha_inicio');
        const fecha_fin = searchParams.get('fecha_fin');
        
        if (habitacionId && fecha_inicio && fecha_fin) {
          data = {
            habitacionId: Number(habitacionId),
            fecha_inicio,
            fecha_fin,
          };
        } else {
          // Intentar obtener desde sessionStorage
          const stored = sessionStorage.getItem('pendingReservation');
          if (stored) {
            data = JSON.parse(stored);
          }
        }
        
        if (!data) {
          setErrorMessage('No se encontraron datos de reserva. Por favor, complete el formulario de reserva primero.');
          errorModal.open();
          setTimeout(() => {
            router.push('/nueva-reserva');
          }, 2000);
          return;
        }
        
        setReservationData(data);
        
        // Cargar información de la habitación
        const roomResponse = await RoomsService.getByIdPublic(data.habitacionId);
        const room = roomResponse.habitacion;
        setRoomData(room);
        
        // Verificar disponibilidad al cargar la página
        try {
          const availabilityResponse = await ReservationsService.checkAvailability(data.habitacionId);
          const existingReservations = availabilityResponse.reservas || [];
          
          // Verificar si hay conflictos con las fechas seleccionadas
          const hasConflict = existingReservations.some(reservation => {
            const resStart = reservation.fecha_inicio.split('T')[0];
            const resEnd = reservation.fecha_fin.split('T')[0];
            const selectedStart = data.fecha_inicio;
            const selectedEnd = data.fecha_fin;
            
            // Verificar si hay solapamiento de fechas
            return (selectedEnd > resStart && selectedStart < resEnd);
          });
          
          if (hasConflict) {
            setErrorMessage('⚠️ La habitación ya no está disponible en las fechas seleccionadas. Serás redirigido al formulario de reserva para seleccionar nuevas fechas.');
            errorModal.open();
            setTimeout(() => {
              sessionStorage.removeItem('pendingReservation');
              router.push('/nueva-reserva');
            }, 4000);
            return;
          }
        } catch (availabilityError: any) {
          // Si falla la verificación de disponibilidad, continuar pero registrar el error
          console.warn('No se pudo verificar la disponibilidad al cargar:', availabilityError);
        }
        
        // Calcular número de noches
        const inicioUTC = new Date(data.fecha_inicio + 'T00:00:00.000Z');
        const finUTC = new Date(data.fecha_fin + 'T00:00:00.000Z');
        const diffTime = Math.abs(finUTC.getTime() - inicioUTC.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
        
        // Calcular monto total
        const total = room.precio_noche * diffDays;
        setMonto(total);
        
      } catch (err: any) {
        console.error('Error al cargar datos de reserva:', err);
        setErrorMessage(err?.message || 'Error al cargar los datos de la reserva');
        errorModal.open();
      } finally {
        setLoading(false);
      }
    };
    
    loadReservationData();
  }, [loadingAuth, isLoggedIn, user, searchParams, router, hasLoaded, errorModal]);

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    if (!reservationData || !roomData) {
      setErrorMessage('Datos de reserva incompletos');
      errorModal.open();
      return;
    }

    try {
      setIsSubmitting(true);
      
      // 1. Verificar disponibilidad antes de crear la reserva
      // Esto es importante porque puede haber pasado tiempo desde que el usuario completó el formulario
      const availabilityResponse = await ReservationsService.checkAvailability(reservationData.habitacionId);
      const existingReservations = availabilityResponse.reservas || [];
      
      // Verificar si hay conflictos con las fechas seleccionadas
      const hasConflict = existingReservations.some(reservation => {
        const resStart = reservation.fecha_inicio.split('T')[0];
        const resEnd = reservation.fecha_fin.split('T')[0];
        const selectedStart = reservationData.fecha_inicio;
        const selectedEnd = reservationData.fecha_fin;
        
        // Verificar si hay solapamiento de fechas
        return (selectedEnd > resStart && selectedStart < resEnd);
      });
      
      if (hasConflict) {
        setErrorMessage('Lo sentimos, la habitación ya no está disponible en las fechas seleccionadas. Por favor, seleccione otras fechas.');
        errorModal.open();
        setTimeout(() => {
          sessionStorage.removeItem('pendingReservation');
          router.push('/nueva-reserva');
        }, 3000);
        return;
      }
      
      // 2. Crear la reserva
      const reservationPayload = {
        habitacionId: reservationData.habitacionId,
        fecha_inicio: reservationData.fecha_inicio,
        fecha_fin: reservationData.fecha_fin,
      };
      
      const reservationResponse = await ReservationsService.createReservation(reservationPayload);
      
      // 3. Procesar el pago con el ID de la reserva
      const paymentResponse = await PaymentsService.createPayment({
        ...paymentData,
        monto: monto,
        reservaId: reservationResponse.id,
      });
      
      // 4. Limpiar sessionStorage
      sessionStorage.removeItem('pendingReservation');
      
      setSuccessMessage('¡Pago procesado y reserva creada exitosamente!');
      successModal.open();
      
      setTimeout(() => {
        router.push('/mis-reservas');
      }, 2000);
      
    } catch (err: any) {
      console.error('Error al procesar el pago:', err);
      
      // Manejar específicamente el error de conflicto
      if (err?.message?.includes('Conflicto de reserva') || err?.message?.includes('ocupada')) {
        setErrorMessage('Lo sentimos, la habitación ya no está disponible en las fechas seleccionadas. Por favor, seleccione otras fechas.');
        errorModal.open();
        setTimeout(() => {
          sessionStorage.removeItem('pendingReservation');
          router.push('/nueva-reserva');
        }, 3000);
      } else {
        setErrorMessage(err?.message || 'Error al procesar el pago. Por favor, intente nuevamente.');
        errorModal.open();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem('pendingReservation');
    router.push('/nueva-reserva');
  };

  const canAccess = isLoggedIn && user?.rol === 'cliente';
  const isLoading = loadingAuth || loading;
  const isDataReady = reservationData !== null && roomData !== null;

  return {
    // Estados de autenticación
    loadingAuth,
    isLoggedIn,
    user,
    canAccess,
    isLoading,
    isDataReady,
    
    // Estados de carga y envío
    isSubmitting,
    loading,
    
    // Datos
    reservationData,
    roomData,
    monto,
    nights,
    
    // Modales
    successModal,
    errorModal,
    successMessage,
    errorMessage,
    
    // Handlers
    handlePaymentSubmit,
    handleCancel,
  };
};

