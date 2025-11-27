"use client";

import React from 'react';
import { colors } from '@/utils/Tokens';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

/**
 * Componente reutilizable para mostrar alertas de error inline
 * Usa tokens de diseño y es responsive
 */
export default function ErrorAlert({ 
  message, 
  onClose, 
  className = '' 
}: ErrorAlertProps) {
  return (
    <div 
      className={`bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 ${className}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <p className="font-semibold flex-1">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-red-700 hover:text-red-900 focus:outline-none"
            aria-label="Cerrar alerta"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

