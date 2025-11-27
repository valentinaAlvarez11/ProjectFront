"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface EmptyStateProps {
  message: string;
}

/**
 * Componente reutilizable para mostrar estados vacíos
 * Usa tokens de diseño y es responsive
 */
export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className={admin.emptyState.container}>
      <p className={admin.emptyState.text}>{message}</p>
    </div>
  );
}
