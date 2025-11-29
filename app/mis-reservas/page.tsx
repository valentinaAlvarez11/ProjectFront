"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';
import { IReservation } from '@/interfaces/reservations';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import { adminPage } from '@/utils/Tokens';
import { FaCalendarAlt, FaBed, FaDollarSign } from 'react-icons/fa';
import { formatDate, formatCurrency, calculateNights } from '@/utils/formatters';
import EstadoBadge from '@/components/atoms/EstadoBadge';

export default function MisReservasPage() {
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
    } else if (!loadingAuth && isLoggedIn && user?.rol !== 'cliente') {
      router.push('/');
    } else if (!loadingAuth && isLoggedIn && user?.rol === 'cliente') {
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


  if (loadingAuth || loading) {
    return <LoadingState message="Cargando tus reservas..." />;
  }

  if (!isLoggedIn || user?.rol !== 'cliente') {
    return null;
  }

  return (
    <div className={adminPage.container}>
      <div className={adminPage.contentWrapper}>
        {/* Header */}
        <div className={`${adminPage.headerContainer} mb-6 sm:mb-8`}>
          <div className={adminPage.headerContent}>
            <h1 className={adminPage.headerTitle}>
              Mis Reservas
            </h1>
            <p className={adminPage.headerSubtitle}>
              Consulta el historial de todas tus reservas
            </p>
          </div>
        </div>

        {error && (
          <ErrorAlert 
            message={error} 
            onClose={() => setError(null)}
          />
        )}

        {reservations.length === 0 ? (
          <div className={adminPage.emptyState}>
            <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className={adminPage.emptyStateText}>
              No tienes reservas registradas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 transform hover:-translate-y-2 w-full"
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Header de la reserva */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
                        <FaBed className="text-white text-base sm:text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#0a174e] truncate">
                          Reserva #{reservation.id}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          Habitación ID: {reservation.habitacionId}
                        </p>
                      </div>
                    </div>
                    <EstadoBadge 
                      estado={reservation.estado} 
                      tipo="reserva"
                      className="flex-shrink-0"
                    />
                  </div>

                  {/* Información de fechas */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg flex-shrink-0">
                        <FaCalendarAlt className="text-white text-xs sm:text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold uppercase">Fechas</p>
                        <p className="text-sm sm:text-base font-medium text-[#0a174e]">
                          {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
                        </p>
                        <p className="text-xs text-[#b6a253] font-semibold mt-1">
                          {calculateNights(reservation.fecha_inicio, reservation.fecha_fin)} noche{calculateNights(reservation.fecha_inicio, reservation.fecha_fin) > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#0a174e]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253] mt-3 sm:mt-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-2 bg-[#b6a253] rounded-lg">
                          <FaDollarSign className="text-white text-sm sm:text-base" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Precio Total</p>
                          <p className="text-xl sm:text-2xl font-bold text-[#0a174e]">
                            {formatCurrency(reservation.precio_total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

