"use client";

import React from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export type EstadoType = 'reserva' | 'pago';

export interface EstadoBadgeProps {
  estado: string;
  tipo?: EstadoType;
  showIcon?: boolean;
  className?: string;
}

/**
 * Componente reutilizable para mostrar badges de estado
 * Soporta estados de reservas y pagos
 */
export default function EstadoBadge({ 
  estado, 
  tipo = 'reserva',
  showIcon = true,
  className = ''
}: EstadoBadgeProps) {
  const estadoLower = estado?.toLowerCase() || '';

  // Determinar el color del badge según el estado
  const getBadgeColor = (): string => {
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

  // Obtener el icono según el estado
  const getIcon = (): React.ReactNode => {
    if (!showIcon) return null;

    switch (estadoLower) {
      case 'confirmada':
      case 'completado':
      case 'aprobado':
        return <FaCheckCircle className="text-green-600 text-sm sm:text-base" />;
      case 'pendiente':
        return <FaClock className="text-yellow-600 text-sm sm:text-base" />;
      case 'cancelada':
      case 'rechazado':
      case 'cancelado':
        return <FaTimesCircle className="text-red-600 text-sm sm:text-base" />;
      default:
        return <FaClock className="text-gray-600 text-sm sm:text-base" />;
    }
  };

  // Capitalizar la primera letra del estado
  const estadoDisplay = estado.charAt(0).toUpperCase() + estado.slice(1);

  return (
    <div 
      className={`
        inline-flex items-center gap-1.5 sm:gap-2 
        px-2 sm:px-3 py-1 sm:py-1.5 
        rounded-lg border 
        text-xs sm:text-sm font-semibold
        transition-colors duration-200
        ${getBadgeColor()}
        ${className}
      `}
    >
      {getIcon()}
      <span>{estadoDisplay}</span>
    </div>
  );
}
