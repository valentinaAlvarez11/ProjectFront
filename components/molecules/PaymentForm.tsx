"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, PaymentFormData } from '@/schemas/payment';
import FormInput from '@/components/atoms/FormInput';
import FormButton from '@/components/atoms/FormButton';
import FormSection from '@/components/molecules/FormSection';
import ErrorAlert from '@/components/molecules/ErrorAlert';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { formComponents, spacing } from '@/utils/Tokens';
import PriceSummary from '@/components/molecules/PriceSummary';

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  monto: number;
  reservationData?: {
    habitacionId: number;
    fecha_inicio: string;
    fecha_fin: string;
    precioPorNoche: number;
    nights: number;
  };
}

export default function PaymentForm({
  onSubmit,
  onCancel,
  isLoading = false,
  monto,
  reservationData,
}: PaymentFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      numero_tarjeta: '',
      nombre_titular: '',
      fecha_expiracion: '',
      cvv: '',
      monto: monto,
    },
  });

  // Formatear número de tarjeta mientras se escribe (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, ''); // Remover espacios
    value = value.replace(/\D/g, ''); // Solo números
    if (value.length > 16) value = value.slice(0, 16); // Máximo 16 dígitos
    
    // Formatear con espacios cada 4 dígitos
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setValue('numero_tarjeta', formatted, { shouldValidate: true });
  };

  // Formatear fecha de expiración (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 4) value = value.slice(0, 4);
    
    // Formatear como MM/YY
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setValue('fecha_expiracion', value, { shouldValidate: true });
  };

  // Formatear CVV (solo números, máximo 4 dígitos)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 4) value = value.slice(0, 4);
    setValue('cvv', value, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: PaymentFormData) => {
    try {
      setServerError(null);
      
      // Limpiar el número de tarjeta de espacios antes de enviar
      const cleanedCardNumber = data.numero_tarjeta.replace(/\s/g, '');
      
      await onSubmit({
        ...data,
        numero_tarjeta: cleanedCardNumber,
      });
    } catch (error: any) {
      console.error('Error al procesar el pago:', error);
      setServerError(error?.message || 'Error al procesar el pago');
    }
  };

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 sm:space-y-8">
        {/* Mensaje de error del servidor */}
        {serverError && (
          <ErrorAlert
            message={serverError}
            onClose={() => setServerError(null)}
          />
        )}

        {/* Resumen de la Reserva */}
        {reservationData && (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border-2 border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-[#0a174e] mb-4">Resumen de tu Reserva</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Check-in:</span> {new Date(reservationData.fecha_inicio).toLocaleDateString('es-ES')}</p>
              <p><span className="font-semibold">Check-out:</span> {new Date(reservationData.fecha_fin).toLocaleDateString('es-ES')}</p>
              <p><span className="font-semibold">Noches:</span> {reservationData.nights}</p>
            </div>
          </div>
        )}

        {/* Resumen de Precios */}
        {reservationData && (
          <PriceSummary
            pricePerNight={reservationData.precioPorNoche}
            nights={reservationData.nights}
            total={monto}
          />
        )}

        {/* Información de Pago */}
        <FormSection
          icon={FaCreditCard}
          title="Información de Pago"
          subtitle="Complete los datos de su tarjeta de crédito"
          variant="gradient"
        >
          {/* Número de Tarjeta */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0a174e]/10 flex items-center justify-center">
                <FaCreditCard className="text-[#0a174e] text-lg" />
              </div>
              <h3 className="text-lg font-bold text-[#0a174e]">Datos de la Tarjeta</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="numero_tarjeta" className={formComponents.label}>
                  Número de Tarjeta <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('numero_tarjeta')}
                  type="text"
                  id="numero_tarjeta"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={handleCardNumberChange}
                  className={`${formComponents.inputBase} ${
                    errors.numero_tarjeta
                      ? formComponents.inputError
                      : formComponents.inputNormal
                  }`}
                />
                {errors.numero_tarjeta && (
                  <p className={formComponents.errorText}>{errors.numero_tarjeta.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="nombre_titular" className={formComponents.label}>
                  Nombre del Titular <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('nombre_titular')}
                  type="text"
                  id="nombre_titular"
                  className={`${formComponents.inputBase} ${
                    errors.nombre_titular
                      ? formComponents.inputError
                      : formComponents.inputNormal
                  }`}
                />
                {errors.nombre_titular && (
                  <p className={formComponents.errorText}>{errors.nombre_titular.message}</p>
                )}
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 ${spacing.gap.medium}`}>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fecha_expiracion" className={formComponents.label}>
                    Fecha de Expiración <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fecha_expiracion')}
                    type="text"
                    id="fecha_expiracion"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={handleExpiryChange}
                    className={`${formComponents.inputBase} ${
                      errors.fecha_expiracion
                        ? formComponents.inputError
                        : formComponents.inputNormal
                    }`}
                  />
                  {errors.fecha_expiracion && (
                    <p className={formComponents.errorText}>{errors.fecha_expiracion.message}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="cvv" className={formComponents.label}>
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('cvv')}
                    type="text"
                    id="cvv"
                    maxLength={4}
                    onChange={handleCvvChange}
                    className={`${formComponents.inputBase} ${
                      errors.cvv
                        ? formComponents.inputError
                        : formComponents.inputNormal
                    }`}
                  />
                  {errors.cvv && (
                    <p className={formComponents.errorText}>{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Información de Seguridad */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <FaLock className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Pago Seguro</p>
              <p className="text-blue-700">
                Sus datos están protegidos. Este es un sistema de pago simulado para fines de demostración.
              </p>
            </div>
          </div>
        </FormSection>

        {/* Total a Pagar */}
        <div className="bg-gradient-to-br from-[#b6a253]/15 via-[#b6a253]/10 to-[#0a174e]/10 rounded-2xl border-2 border-[#b6a253]/40 shadow-lg p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg sm:text-xl font-bold text-[#0a174e]">
              Total a Pagar
            </span>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#b6a253] to-[#d4c373] bg-clip-text text-transparent">
              ${monto.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <FormButton
              type="submit"
              variant="primary"
              className="flex-1 order-2 sm:order-1"
              disabled={isLoading}
              fullWidth={true}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Procesando pago...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaCreditCard />
                  Procesar Pago
                </span>
              )}
            </FormButton>
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1 order-1 sm:order-2"
              disabled={isLoading}
              fullWidth={true}
            >
              Cancelar
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  );
}
