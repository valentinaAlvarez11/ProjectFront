"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import PaymentsService from '@/libs/payments.service';
import { IPayment } from '@/interfaces/payments';

export const useRegistros = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [payments, setPayments] = useState<IPayment[]>([]);
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
      loadPayments();
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PaymentsService.getMyPayments();
      setPayments(response.pagos);
    } catch (err: any) {
      console.error('Error al cargar pagos:', err);
      setError(err?.message || 'Error al cargar tu historial de compras');
    } finally {
      setLoading(false);
    }
  };

  const canAccess = isLoggedIn && user?.rol === 'cliente';
  const isLoading = loadingAuth || loading;

  return {
    payments,
    loading: isLoading,
    error,
    canAccess,
    user,
  };
};

