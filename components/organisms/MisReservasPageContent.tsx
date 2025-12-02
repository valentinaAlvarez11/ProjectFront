"use client";

import React, { useState, useEffect } from 'react';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import { adminPage } from '@/utils/Tokens';
import { FaCalendarAlt, FaBed, FaDollarSign } from 'react-icons/fa';
import { formatDate, formatCurrency, calculateNights } from '@/utils/formatters';
import EstadoBadge from '@/components/atoms/EstadoBadge';
import { useMisReservas } from '@/hooks/useMisReservas';

export default function MisReservasPageContent() {
  const { reservations, loading, error, canAccess } = useMisReservas();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  if (loading) {
    return <LoadingState message="Cargando tus reservas..." />;
  }

  if (!canAccess) {
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

        {errorMessage && (
          <ErrorAlert 
            message={errorMessage} 
            onClose={() => setErrorMessage(null)}
          />
        )}

        {reservations.length === 0 ? (
          <div className={adminPage.emptyState}>
            <FaCalendarAlt className={adminPage.reservas.emptyStateIcon} />
            <p className={adminPage.emptyStateText}>
              No tienes reservas registradas
            </p>
          </div>
        ) : (
          <div className={adminPage.reservas.gridContainer}>
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className={adminPage.reservas.reservationCard}
              >
                <div className={adminPage.reservas.cardContent}>
                  {/* Header de la reserva */}
                  <div className={adminPage.reservas.cardHeader}>
                    <div className={adminPage.reservas.headerLeft}>
                      <div className={adminPage.reservas.headerIconContainer}>
                        <FaBed className={adminPage.reservas.headerIcon} />
                      </div>
                      <div className={adminPage.reservas.headerTextContainer}>
                        <h3 className={adminPage.reservas.headerTitle}>
                          Reserva #{reservation.id}
                        </h3>
                        <p className={adminPage.reservas.headerSubtitle}>
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
                  <div className={adminPage.reservas.infoSection}>
                    <div className={adminPage.reservas.dateInfoRow}>
                      <div className={adminPage.reservas.dateIconContainer}>
                        <FaCalendarAlt className={adminPage.reservas.dateIcon} />
                      </div>
                      <div className={adminPage.reservas.dateContent}>
                        <p className={adminPage.reservas.dateLabel}>Fechas</p>
                        <p className={adminPage.reservas.dateValue}>
                          {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
                        </p>
                        <p className={adminPage.reservas.nightsText}>
                          {calculateNights(reservation.fecha_inicio, reservation.fecha_fin)} noche{calculateNights(reservation.fecha_inicio, reservation.fecha_fin) > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className={adminPage.reservas.priceContainer}>
                      <div className={adminPage.reservas.priceLeft}>
                        <div className={adminPage.reservas.priceIconContainer}>
                          <FaDollarSign className={adminPage.reservas.priceIcon} />
                        </div>
                        <div>
                          <p className={adminPage.reservas.priceLabel}>Precio Total</p>
                          <p className={adminPage.reservas.priceValue}>
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

