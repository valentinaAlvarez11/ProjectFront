"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import PaymentsService from '@/libs/payments.service';
import { IPayment } from '@/interfaces/payments';
import LoadingState from '@/components/atoms/LoadingState';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import PageContainer from '@/components/atoms/PageContainer';
import PageHeader from '@/components/atoms/PageHeader';
import { adminPage } from '@/utils/Tokens';
import { FaCreditCard, FaDollarSign, FaCalendarAlt, FaReceipt } from 'react-icons/fa';
import { formatDateTime, formatCurrency, maskCardNumber } from '@/utils/formatters';
import EstadoBadge from '@/components/atoms/EstadoBadge';

export default function RegistrosPage() {
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
    } else if (!loadingAuth && isLoggedIn && user?.rol !== 'cliente') {
      router.push('/');
    } else if (!loadingAuth && isLoggedIn && user?.rol === 'cliente') {
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


  if (loadingAuth || loading) {
    return <LoadingState message="Cargando tu historial de compras..." />;
  }

  if (!isLoggedIn || user?.rol !== 'cliente') {
    return null;
  }

  return (
    <PageContainer>
      <PageHeader
        title="Historial de Compras"
        subtitle="Consulta el historial de todos tus pagos y transacciones"
      />

      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {payments.length === 0 ? (
        <div className={adminPage.emptyState}>
          <FaReceipt className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className={adminPage.emptyStateText}>
            No tienes compras registradas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-100 hover:border-[#b6a253] transition-all duration-300 transform hover:-translate-y-2 w-full"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Header del pago */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
                      <FaCreditCard className="text-white text-base sm:text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#0a174e] truncate">
                        Pago #{payment.id}
                      </h3>
                      {payment.reservaId && (
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
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
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#b6a253] to-[#d4c373] rounded-lg flex-shrink-0">
                      <FaCreditCard className="text-white text-xs sm:text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Tarjeta</p>
                      <p className="text-sm sm:text-base font-medium text-[#0a174e]">
                        {maskCardNumber(payment.numero_tarjeta)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {payment.nombre_titular}
                      </p>
                    </div>
                  </div>

                  {/* Fecha de pago */}
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#0a174e] to-[#222a54] rounded-lg flex-shrink-0">
                      <FaCalendarAlt className="text-white text-xs sm:text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Fecha de Pago</p>
                      <p className="text-sm sm:text-base font-medium text-[#0a174e]">
                        {formatDateTime(payment.fecha_pago)}
                      </p>
                    </div>
                  </div>

                  {/* Monto */}
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#0a174e]/10 to-[#222a54]/10 rounded-lg border-l-4 border-[#b6a253] mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-[#b6a253] rounded-lg">
                        <FaDollarSign className="text-white text-sm sm:text-base" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Monto Total</p>
                        <p className="text-xl sm:text-2xl font-bold text-[#0a174e]">
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
