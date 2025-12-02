"use client";

import React, { useState, useEffect } from 'react';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import PageContainer from '@/components/atoms/PageContainer';
import PageHeader from '@/components/atoms/PageHeader';
import EstadoBadge from '@/components/atoms/EstadoBadge';
import { useRegistros } from '@/hooks/useRegistros';
import { adminPage } from '@/utils/Tokens';
import { FaCreditCard, FaDollarSign, FaCalendarAlt, FaReceipt } from 'react-icons/fa';
import { formatDateTime, formatCurrency, maskCardNumber } from '@/utils/formatters';

export default function RegistrosPageContent() {
  const { payments, loading, error, canAccess } = useRegistros();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  if (loading) {
    return <LoadingState message="Cargando tu historial de compras..." />;
  }

  if (!canAccess) {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Historial de Compras"
        subtitle="Consulta el historial de todos tus pagos y transacciones"
      />

      {errorMessage && (
        <ErrorAlert 
          message={errorMessage} 
          onClose={() => setErrorMessage(null)}
        />
      )}

      {payments.length === 0 ? (
        <div className={adminPage.emptyState}>
          <FaReceipt className={adminPage.registros.emptyStateIcon} />
          <p className={adminPage.emptyStateText}>
            No tienes compras registradas
          </p>
        </div>
      ) : (
        <div className={adminPage.registros.gridContainer}>
          {payments.map((payment) => (
            <div
              key={payment.id}
              className={adminPage.registros.paymentCard}
            >
              <div className={adminPage.registros.cardContent}>
                {/* Header del pago */}
                <div className={adminPage.registros.cardHeader}>
                  <div className={adminPage.registros.headerLeft}>
                    <div className={adminPage.registros.headerIconContainer}>
                      <FaCreditCard className={adminPage.registros.headerIcon} />
                    </div>
                    <div className={adminPage.registros.headerTextContainer}>
                      <h3 className={adminPage.registros.headerTitle}>
                        Pago #{payment.id}
                      </h3>
                      {payment.reservaId && (
                        <p className={adminPage.registros.headerSubtitle}>
                          Reserva ID: {payment.reservaId}
                        </p>
                      )}
                    </div>
                  </div>
                  <EstadoBadge 
                    estado={payment.estado} 
                    tipo="pago"
                    className="flex-shrink-0"
                  />
                </div>

                {/* Información de la tarjeta */}
                <div className={adminPage.registros.infoSection}>
                  <div className={adminPage.registros.infoRow}>
                    <div className={adminPage.registros.infoIconContainer}>
                      <FaCreditCard className={adminPage.registros.infoIcon} />
                    </div>
                    <div className={adminPage.registros.infoContent}>
                      <p className={adminPage.registros.infoLabel}>Tarjeta</p>
                      <p className={adminPage.registros.infoValue}>
                        {maskCardNumber(payment.numero_tarjeta)}
                      </p>
                      <p className={adminPage.registros.infoValueSecondary}>
                        {payment.nombre_titular}
                      </p>
                    </div>
                  </div>

                  {/* Fecha de pago */}
                  <div className={adminPage.registros.infoRow}>
                    <div className={adminPage.registros.infoIconContainerDark}>
                      <FaCalendarAlt className={adminPage.registros.infoIcon} />
                    </div>
                    <div className={adminPage.registros.infoContent}>
                      <p className={adminPage.registros.infoLabel}>Fecha de Pago</p>
                      <p className={adminPage.registros.infoValue}>
                        {formatDateTime(payment.fecha_pago)}
                      </p>
                    </div>
                  </div>

                  {/* Monto */}
                  <div className={adminPage.registros.amountContainer}>
                    <div className={adminPage.registros.amountLeft}>
                      <div className={adminPage.registros.amountIconContainer}>
                        <FaDollarSign className={adminPage.registros.amountIcon} />
                      </div>
                      <div>
                        <p className={adminPage.registros.amountLabel}>Monto Total</p>
                        <p className={adminPage.registros.amountValue}>
                          {formatCurrency(payment.monto)}
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
    </PageContainer>
  );
}

