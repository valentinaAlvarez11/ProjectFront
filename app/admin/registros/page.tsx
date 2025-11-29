"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';
import PaymentsService from '@/libs/payments.service';
import { IReservationAdmin } from '@/interfaces/reservations';
import { IPaymentAdmin } from '@/interfaces/payments';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import AdminPageLayout from '@/components/organisms/AdminPageLayout';
import StatCardRegistros from '@/components/molecules/StatCardRegistros';
import Tabs from '@/components/molecules/Tabs';
import FiltersPanel from '@/components/molecules/FiltersPanel';
import ReservationRecordCard from '@/components/molecules/ReservationRecordCard';
import PaymentRecordCard from '@/components/molecules/PaymentRecordCard';
import { adminPage, admin } from '@/utils/Tokens';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaReceipt } from 'react-icons/fa';
import { formatDate, formatDateTime, formatCurrency, maskCardNumber } from '@/utils/formatters';
import EstadoIcon from '@/components/atoms/EstadoIcon';

export default function AdminRegistrosPage() {
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
    } else if (!loadingAuth && isLoggedIn && user?.rol !== 'admin' && user?.rol !== 'recepcionista') {
      router.push('/');
    } else if (!loadingAuth && isLoggedIn && (user?.rol === 'admin' || user?.rol === 'recepcionista')) {
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

  // Funciones helper para compatibilidad (ahora usan utilidades)
  const getEstadoIcon = (estado: string, tipo: 'reserva' | 'pago' = 'reserva') => {
    return <EstadoIcon estado={estado} tipo={tipo} />;
  };

  const getEstadoBadgeColor = (estado: string, tipo: 'reserva' | 'pago' = 'reserva') => {
    // Esta función ya no se usa directamente, pero se mantiene para compatibilidad
    // El componente EstadoBadge maneja los colores internamente
    const estadoLower = estado?.toLowerCase() || '';
    switch (estadoLower) {
      case 'confirmada':
      case 'completado':
      case 'aprobado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelada':
      case 'rechazado':
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Filtrar reservas
  const filteredReservations = reservations.filter((reservation) => {
    const matchesEstado = filterEstado === 'todos' || reservation.estado.toLowerCase() === filterEstado.toLowerCase();
    const matchesSearch = 
      searchTerm === '' ||
      reservation.nombre_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.numero_habitacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toString().includes(searchTerm);
    return matchesEstado && matchesSearch;
  });

  // Filtrar pagos
  const filteredPayments = payments.filter((payment) => {
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

  // Estadísticas de reservas
  const totalReservas = reservations.length;
  const confirmadas = reservations.filter(r => r.estado === 'confirmada').length;
  const pendientes = reservations.filter(r => r.estado === 'pendiente').length;
  const canceladas = reservations.filter(r => r.estado === 'cancelada').length;

  // Estadísticas de pagos
  const totalPagos = payments.length;
  const completados = payments.filter(p => p.estado === 'completado' || p.estado === 'aprobado').length;
  const pendientesPagos = payments.filter(p => p.estado === 'pendiente').length;
  const rechazados = payments.filter(p => p.estado === 'rechazado' || p.estado === 'cancelado').length;

  if (loadingAuth || (loading && activeTab === 'reservas') || (loadingPayments && activeTab === 'pagos')) {
    return <LoadingState message={activeTab === 'reservas' ? "Cargando historial de reservas..." : "Cargando historial de pagos..."} />;
  }

  if (!isLoggedIn || (user?.rol !== 'admin' && user?.rol !== 'recepcionista')) {
    return null;
  }

  return (
    <AdminPageLayout
      title="Registros"
      subtitle="Consulta el historial completo de reservas y pagos de todos los usuarios"
      requireAdmin={false}
    >
      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {errorPayments && activeTab === 'pagos' && (
        <ErrorAlert 
          message={errorPayments} 
          onClose={() => setErrorPayments(null)}
        />
      )}

      {/* Pestañas */}
      <Tabs
        tabs={[
          { id: 'reservas', label: 'Reservas', icon: <FaCalendarAlt /> },
          { id: 'pagos', label: 'Pagos', icon: <FaReceipt /> },
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as 'reservas' | 'pagos')}
      />

      {/* Contenido de Reservas */}
      {activeTab === 'reservas' && (
        <>
          {/* Estadísticas de Reservas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCardRegistros
              label="Total Reservas"
              value={totalReservas}
              icon={<FaCalendarAlt />}
              variant="blue"
            />
            <StatCardRegistros
              label="Confirmadas"
              value={confirmadas}
              icon={<FaCheckCircle />}
              variant="green"
            />
            <StatCardRegistros
              label="Pendientes"
              value={pendientes}
              icon={<FaClock />}
              variant="yellow"
            />
            <StatCardRegistros
              label="Canceladas"
              value={canceladas}
              icon={<FaTimesCircle />}
              variant="red"
            />
          </div>

          {/* Filtros de Reservas */}
          <FiltersPanel
            searchPlaceholder="Buscar por cliente, habitación o ID..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filterLabel="Filtrar por Estado"
            filterValue={filterEstado}
            onFilterChange={setFilterEstado}
            filterOptions={[
              { value: 'todos', label: 'Todos' },
              { value: 'confirmada', label: 'Confirmadas' },
              { value: 'pendiente', label: 'Pendientes' },
              { value: 'cancelada', label: 'Canceladas' },
            ]}
          />

          {filteredReservations.length === 0 ? (
            <div className={adminPage.emptyState}>
              <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className={adminPage.emptyStateText}>
                {reservations.length === 0 
                  ? 'No hay reservas registradas' 
                  : 'No se encontraron reservas con los filtros aplicados'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {filteredReservations.map((reservation) => (
                <ReservationRecordCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Contenido de Pagos */}
      {activeTab === 'pagos' && (
        <>
          {loadingPayments ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingState message="Cargando historial de pagos..." />
            </div>
          ) : (
            <>
              {/* Estadísticas de Pagos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCardRegistros
                  label="Total Pagos"
                  value={totalPagos}
                  icon={<FaReceipt />}
                  variant="blue"
                />
                <StatCardRegistros
                  label="Completados"
                  value={completados}
                  icon={<FaCheckCircle />}
                  variant="green"
                />
                <StatCardRegistros
                  label="Pendientes"
                  value={pendientesPagos}
                  icon={<FaClock />}
                  variant="yellow"
                />
                <StatCardRegistros
                  label="Rechazados"
                  value={rechazados}
                  icon={<FaTimesCircle />}
                  variant="red"
                />
              </div>

              {/* Filtros de Pagos */}
              <FiltersPanel
                searchPlaceholder="Buscar por usuario, ID de pago o reserva..."
                searchValue={searchTermPagos}
                onSearchChange={setSearchTermPagos}
                filterLabel="Filtrar por Estado"
                filterValue={filterEstadoPagos}
                onFilterChange={setFilterEstadoPagos}
                filterOptions={[
                  { value: 'todos', label: 'Todos' },
                  { value: 'completado', label: 'Completados' },
                  { value: 'aprobado', label: 'Aprobados' },
                  { value: 'pendiente', label: 'Pendientes' },
                  { value: 'rechazado', label: 'Rechazados' },
                  { value: 'cancelado', label: 'Cancelados' },
                ]}
              />

          {filteredPayments.length === 0 ? (
            <div className={adminPage.emptyState}>
              <FaReceipt className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className={adminPage.emptyStateText}>
                {payments.length === 0 
                  ? 'No hay pagos registrados' 
                  : 'No se encontraron pagos con los filtros aplicados'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {filteredPayments.map((payment) => (
                <PaymentRecordCard
                  key={payment.id}
                  payment={payment}
                />
              ))}
            </div>
          )}
            </>
          )}
        </>
      )}
    </AdminPageLayout>
  );
}
