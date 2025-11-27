"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface ErrorAlertProps {
  message: string;
}

/**
 * Componente reutilizable para mostrar alertas de error
 * Usa tokens de diseño y es responsive
 */
export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className={admin.alert.error}>
      <p className={admin.alert.errorText}>{message}</p>
    </div>
  );
}

