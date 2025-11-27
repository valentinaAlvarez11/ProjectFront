"use client";

import React from 'react';
import { admin, colors } from '@/utils/Tokens';

interface AuthLoadingStateProps {
  message?: string;
}

/**
 * Componente reutilizable para mostrar estado de carga durante verificación de autenticación
 * Usa tokens de diseño y es responsive
 */

export default function AuthLoadingState({ message = "Verificando autenticación..." }: AuthLoadingStateProps) {
  return (
    <div className={admin.loading.container}>
      <div className="text-center">
        <div 
          className={admin.loading.spinner}
          style={{ borderColor: colors.primary.base }}
        ></div>
        <p 
          className={admin.loading.text}
          style={{ color: colors.primary.base }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

