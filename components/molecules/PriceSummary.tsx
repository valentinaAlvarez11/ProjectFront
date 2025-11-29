import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { typography, colors } from '@/utils/Tokens';

interface PriceSummaryProps {
  pricePerNight: number;
  nights: number;
  subtotal?: number;
  total: number;
  className?: string;
  showSubtotal?: boolean;
}

export default function PriceSummary({
  pricePerNight,
  nights,
  subtotal,
  total,
  className = '',
  showSubtotal = false,
}: PriceSummaryProps) {
  const calculatedSubtotal = subtotal ?? pricePerNight * nights;

  return (
    <div className={`bg-gradient-to-br from-[#b6a253]/15 via-[#b6a253]/10 to-[#0a174e]/10 rounded-2xl border-2 border-[#b6a253]/40 shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${className}`}>
      <div className="bg-gradient-to-r from-[#b6a253] to-[#d4c373] px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <FaDollarSign className="text-xl sm:text-2xl text-white" />
          </div>
          <div>
            <h3 className={`${typography.cardTitle} text-white mb-0 text-lg sm:text-xl`}>
              Resumen de Precios
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-0.5">Detalle de su reserva</p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">💤</span>
            <span className={`${typography.body} text-gray-700`}>
              Precio por noche
            </span>
          </div>
          <span className={`${typography.body} font-bold text-[#0a174e] text-base sm:text-lg`}>
            ${pricePerNight.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">🌙</span>
            <span className={`${typography.body} text-gray-700`}>
              Número de noches
            </span>
          </div>
          <span className={`${typography.body} font-bold text-[#0a174e] text-base sm:text-lg`}>
            {nights} {nights === 1 ? 'noche' : 'noches'}
          </span>
        </div>
        {showSubtotal && calculatedSubtotal !== total && (
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className={`${typography.body} text-gray-700`}>
              Subtotal
            </span>
            <span className={`${typography.body} font-semibold text-gray-600 text-base sm:text-lg`}>
              ${calculatedSubtotal.toLocaleString()}
            </span>
          </div>
        )}
        <div className="pt-3 sm:pt-4 mt-2 bg-gradient-to-r from-[#0a174e]/5 to-[#b6a253]/5 rounded-xl p-3 sm:p-4 border-2 border-[#b6a253]/20">
          <div className="flex justify-between items-center">
            <span className={`${typography.cardTitle} text-[#0a174e] text-lg sm:text-xl`}>
              Total a pagar
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#b6a253] to-[#d4c373] bg-clip-text text-transparent">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
