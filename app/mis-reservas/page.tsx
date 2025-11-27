"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';
import { IReservation } from '@/interfaces/reservations';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import { adminPage } from '@/utils/Tokens';
import { FaCalendarAlt, FaBed, FaDollarSign, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateNights = (fechaInicio: string, fechaFin: string) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diffTime = Math.abs(fin.getTime() - inicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return <FaCheckCircle className="text-green-600" />;
      case 'pendiente':
        return <FaClock className="text-yellow-600" />;
      case 'cancelada':
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="space-y-4">
                  {/* Header de la reserva */}
                  <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg">
                        <FaBed className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0a174e]">
                          Reserva #{reservation.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Habitación ID: {reservation.habitacionId}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full border-2 flex items-center gap-2 ${getEstadoBadgeColor(reservation.estado)}`}>
                      {getEstadoIcon(reservation.estado)}
                      <span className="text-xs font-semibold">
                        {reservation.estado.charAt(0).toUpperCase() + reservation.estado.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Información de fechas */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg">
                        <FaCalendarAlt className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Fechas</p>
                        <p className="text-sm font-medium text-[#0a174e]">
                          {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
                        </p>
                        <p className="text-xs text-[#b6a253] font-semibold mt-1">
                          {calculateNights(reservation.fecha_inicio, reservation.fecha_fin)} noche{calculateNights(reservation.fecha_inicio, reservation.fecha_fin) > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0a174e]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#b6a253] rounded-lg">
                          <FaDollarSign className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Precio Total</p>
                          <p className="text-2xl font-bold text-[#0a174e]">
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

