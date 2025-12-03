"use client";

import React from 'react';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import AdminPageLayout from '@/components/organisms/AdminPageLayout';
import StatCardRegistros from '@/components/molecules/StatCardRegistros';
import Tabs from '@/components/molecules/Tabs';
import FiltersPanel from '@/components/molecules/FiltersPanel';
import ReservationRecordCard from '@/components/molecules/ReservationRecordCard';
import PaymentRecordCard from '@/components/molecules/PaymentRecordCard';
import { adminPage } from '@/utils/Tokens';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaReceipt } from 'react-icons/fa';
import { IReservationAdmin } from '@/interfaces/reservations';
import { IPaymentAdmin } from '@/interfaces/payments';

interface AdminRegistrosContentProps {
  loadingAuth: boolean;
  loading: boolean;
  loadingPayments: boolean;
  error: string | null;
  errorPayments: string | null;
  isLoggedIn: boolean;
  user: { rol: string } | null;
  canAccess: boolean;
  isLoading: boolean;
  reservations: IReservationAdmin[];
  payments: IPaymentAdmin[];
  filteredReservations: IReservationAdmin[];
  filteredPayments: IPaymentAdmin[];
  statsReservas: {
    total: number;
    confirmadas: number;
    pendientes: number;
    canceladas: number;
  };
  statsPagos: {
    total: number;
    completados: number;
    pendientes: number;
    rechazados: number;
  };
  activeTab: 'reservas' | 'pagos';
  setActiveTab: (tab: 'reservas' | 'pagos') => void;
  filterEstado: string;
  setFilterEstado: (value: string) => void;
  filterEstadoPagos: string;
  setFilterEstadoPagos: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchTermPagos: string;
  setSearchTermPagos: (value: string) => void;
  onCloseError: () => void;
  onCloseErrorPayments: () => void;
}

const AdminRegistrosContent: React.FC<AdminRegistrosContentProps> = ({
  loadingAuth,
  loading,
  loadingPayments,
  error,
  errorPayments,
  isLoggedIn,
  user,
  canAccess,
  isLoading,
  reservations,
  payments,
  filteredReservations,
  filteredPayments,
  statsReservas,
  statsPagos,
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
  onCloseError,
  onCloseErrorPayments,
}) => {
  if (isLoading) {
    return (
      <LoadingState 
        message={activeTab === 'reservas' ? "Cargando historial de reservas..." : "Cargando historial de pagos..."} 
      />
    );
  }

  if (!canAccess) {
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
          onClose={onCloseError}
        />
      )}

      {errorPayments && activeTab === 'pagos' && (
        <ErrorAlert 
          message={errorPayments} 
          onClose={onCloseErrorPayments}
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
              value={statsReservas.total}
              icon={<FaCalendarAlt />}
              variant="blue"
            />
            <StatCardRegistros
              label="Confirmadas"
              value={statsReservas.confirmadas}
              icon={<FaCheckCircle />}
              variant="green"
            />
            <StatCardRegistros
              label="Pendientes"
              value={statsReservas.pendientes}
              icon={<FaClock />}
              variant="yellow"
            />
            <StatCardRegistros
              label="Canceladas"
              value={statsReservas.canceladas}
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
                  value={statsPagos.total}
                  icon={<FaReceipt />}
                  variant="blue"
                />
                <StatCardRegistros
                  label="Completados"
                  value={statsPagos.completados}
                  icon={<FaCheckCircle />}
                  variant="green"
                />
                <StatCardRegistros
                  label="Pendientes"
                  value={statsPagos.pendientes}
                  icon={<FaClock />}
                  variant="yellow"
                />
                <StatCardRegistros
                  label="Rechazados"
                  value={statsPagos.rechazados}
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
};

export default AdminRegistrosContent;

