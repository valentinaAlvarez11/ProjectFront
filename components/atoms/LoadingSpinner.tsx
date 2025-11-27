"use client";

import React from 'react';
import { colors } from '@/utils/Tokens';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 border-2',
  md: 'h-12 w-12 border-2',
  lg: 'h-16 w-16 border-4',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Componente reutilizable para mostrar un spinner de carga
 * Usa tokens de diseño y es responsive
 */
export default function LoadingSpinner({ 
  size = 'md', 
  message, 
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} mx-auto`}
        style={{ borderColor: colors.primary.base }}
      >
        <div 
          className="h-full w-full rounded-full border-t-transparent"
          style={{ borderTopColor: colors.primary.base }}
        />
      </div>
      {message && (
        <p 
          className={`mt-4 font-semibold ${textSizeClasses[size]}`}
          style={{ color: colors.primary.base }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

