"use client";

import React from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export type EstadoType = 'reserva' | 'pago';

export interface EstadoIconProps {
  estado: string;
  tipo?: EstadoType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Componente reutilizable para mostrar iconos de estado
 * Soporta estados de reservas y pagos
 */
export default function EstadoIcon({ 
  estado, 
  tipo = 'reserva',
  size = 'md',
  className = ''
}: EstadoIconProps) {
  const estadoLower = estado?.toLowerCase() || '';

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl'
  };

  const getIcon = (): React.ReactNode => {
    switch (estadoLower) {
      case 'confirmada':
      case 'completado':
      case 'aprobado':
        return <FaCheckCircle className={`text-green-600 ${sizeClasses[size]} ${className}`} />;
      case 'pendiente':
        return <FaClock className={`text-yellow-600 ${sizeClasses[size]} ${className}`} />;
      case 'cancelada':
      case 'rechazado':
      case 'cancelado':
        return <FaTimesCircle className={`text-red-600 ${sizeClasses[size]} ${className}`} />;
      default:
        return <FaClock className={`text-gray-600 ${sizeClasses[size]} ${className}`} />;
    }
  };

  return <>{getIcon()}</>;
}
