"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';
import PaymentsService from '@/libs/payments.service';
import { IReservationAdmin } from '@/interfaces/reservations';
import { IPaymentAdmin } from '@/interfaces/payments';

export const useAdminRegistros = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const [reservations, setReservations] = useState<IReservationAdmin[]>([]);
  const [payments, setPayments] = useState<IPaymentAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorPayments, setErrorPayments] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reservas' | 'pagos'>('reservas');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterEstadoPagos, setFilterEstadoPagos] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermPagos, setSearchTermPagos] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin' && user?.rol !== 'recepcionista') {
      router.push('/');
      return;
    }
    if (!loadingAuth && isLoggedIn && (user?.rol === 'admin' || user?.rol === 'recepcionista')) {
      loadReservations();
      loadPayments();
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  // Recargar pagos cuando se cambie a la pestaña de pagos si no hay datos
  useEffect(() => {
    if (activeTab === 'pagos' && payments.length === 0 && !loadingPayments && isLoggedIn && (user?.rol === 'admin' || user?.rol === 'recepcionista')) {
      loadPayments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ReservationsService.getAllAdmin();
      setReservations(response.reservas);
    } catch (err: any) {
      console.error('Error al cargar reservas:', err);
      setError(err?.message || 'Error al cargar el historial de reservas');
    } finally {
      setLoading(false);
    }
  };

  const loadPayments = async () => {
    try {
      setLoadingPayments(true);
      setErrorPayments(null);
      console.log('🔄 Intentando cargar pagos desde /payments/admin...');
      const response = await PaymentsService.getAllAdmin();
      console.log('✅ Respuesta recibida:', response);
      setPayments(response.pagos || []);
      console.log('✅ Pagos cargados:', response.pagos?.length || 0);
    } catch (err: any) {
      console.error('❌ Error al cargar pagos:', err);
      console.error('❌ Detalles del error:', {
        message: err?.message,
        status: err?.status,
        response: err?.response
      });
      setErrorPayments(err?.message || 'Error al cargar el historial de pagos. Asegúrate de que el servidor backend esté corriendo.');
      setPayments([]);
    } finally {
      setLoadingPayments(false);
    }
  };

  // Filtrar reservas
  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesEstado = filterEstado === 'todos' || reservation.estado.toLowerCase() === filterEstado.toLowerCase();
      const matchesSearch = 
        searchTerm === '' ||
        reservation.nombre_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.numero_habitacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.id.toString().includes(searchTerm);
      return matchesEstado && matchesSearch;
    });
  }, [reservations, filterEstado, searchTerm]);

  // Filtrar pagos
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      let matchesEstado = true;
      if (filterEstadoPagos !== 'todos') {
        const estadoLower = payment.estado.toLowerCase();
        if (filterEstadoPagos === 'completado' || filterEstadoPagos === 'aprobado') {
          matchesEstado = estadoLower === 'completado' || estadoLower === 'aprobado';
        } else {
          matchesEstado = estadoLower === filterEstadoPagos.toLowerCase();
        }
      }
      const matchesSearch = 
        searchTermPagos === '' ||
        payment.nombre_usuario?.toLowerCase().includes(searchTermPagos.toLowerCase()) ||
        payment.email_usuario?.toLowerCase().includes(searchTermPagos.toLowerCase()) ||
        payment.id.toString().includes(searchTermPagos) ||
        payment.reservaId?.toString().includes(searchTermPagos);
      return matchesEstado && matchesSearch;
    });
  }, [payments, filterEstadoPagos, searchTermPagos]);

  // Estadísticas de reservas
  const statsReservas = useMemo(() => {
    return {
      total: reservations.length,
      confirmadas: reservations.filter(r => r.estado === 'confirmada').length,
      pendientes: reservations.filter(r => r.estado === 'pendiente').length,
      canceladas: reservations.filter(r => r.estado === 'cancelada').length,
    };
  }, [reservations]);

  // Estadísticas de pagos
  const statsPagos = useMemo(() => {
    return {
      total: payments.length,
      completados: payments.filter(p => p.estado === 'completado' || p.estado === 'aprobado').length,
      pendientes: payments.filter(p => p.estado === 'pendiente').length,
      rechazados: payments.filter(p => p.estado === 'rechazado' || p.estado === 'cancelado').length,
    };
  }, [payments]);

  const canAccess = isLoggedIn && (user?.rol === 'admin' || user?.rol === 'recepcionista');
  const isLoading = loadingAuth || (loading && activeTab === 'reservas') || (loadingPayments && activeTab === 'pagos');

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseErrorPayments = () => {
    setErrorPayments(null);
  };

  return {
    // Estados
    loadingAuth,
    loading,
    loadingPayments,
    error,
    errorPayments,
    isLoggedIn,
    user,
    canAccess,
    isLoading,
    
    // Datos
    reservations,
    payments,
    filteredReservations,
    filteredPayments,
    
    // Estadísticas
    statsReservas,
    statsPagos,
    
    // Tabs y filtros
    activeTab,
    setActiveTab,
    filterEstado,
    setFilterEstado,
    filterEstadoPagos,
    setFilterEstadoPagos,
    searchTerm,
    setSearchTerm,
    searchTermPagos,
    setSearchTermPagos,
    
    // Handlers
    handleCloseError,
    handleCloseErrorPayments,
  };
};

