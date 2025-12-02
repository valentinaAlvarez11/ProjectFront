"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';
import { IReservation } from '@/interfaces/reservations';

export const useMisReservas = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    if (!loadingAuth && isLoggedIn && user?.rol === 'cliente') {
      loadReservations();
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ReservationsService.getMyReservations();
      setReservations(response.reservas);
    } catch (err: any) {
      console.error('Error al cargar reservas:', err);
      setError(err?.message || 'Error al cargar tus reservas');
    } finally {
      setLoading(false);
    }
  };

  const canAccess = isLoggedIn && user?.rol === 'cliente';
  const isLoading = loadingAuth || loading;

  return {
    reservations,
    loading: isLoading,
    error,
    canAccess,
  };
};

