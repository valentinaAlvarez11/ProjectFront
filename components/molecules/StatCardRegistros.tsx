"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface StatCardRegistrosProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  variant: 'blue' | 'green' | 'yellow' | 'red';
}

/**
 * Componente reutilizable para tarjetas de estadísticas
 * Totalmente responsive con diseño adaptativo
 */
export default function StatCardRegistros({ 
  label, 
  value, 
  icon, 
  variant 
}: StatCardRegistrosProps) {
  const borderClass = admin.statCardRegistros[`border${variant.charAt(0).toUpperCase() + variant.slice(1)}` as 'borderBlue' | 'borderGreen' | 'borderYellow' | 'borderRed'];
  const textClass = admin.statCardRegistros[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as 'textBlue' | 'textGreen' | 'textYellow' | 'textRed'];
  const iconColorClass = variant === 'blue' ? 'text-blue-500' : 
                        variant === 'green' ? 'text-green-500' : 
                        variant === 'yellow' ? 'text-yellow-500' : 
                        'text-red-500';

  return (
    <div className={`${admin.statCardRegistros.container} ${borderClass} w-full`}>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1 sm:mb-2">{label}</p>
          <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${textClass}`}>{value}</p>
        </div>
        <div className={`text-2xl sm:text-3xl lg:text-4xl ${iconColorClass} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
