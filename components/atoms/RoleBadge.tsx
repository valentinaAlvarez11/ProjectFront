"use client";

import React from 'react';
import { admin } from '@/utils/Tokens';

interface RoleBadgeProps {
  rol: 'admin' | 'recepcionista' | 'cliente' | string;
}

/**
 * Componente reutilizable para mostrar badges de roles
 * Usa tokens de diseño
 */
export default function RoleBadge({ rol }: RoleBadgeProps) {
  const getBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return admin.badge.admin;
      case 'recepcionista':
        return admin.badge.recepcionista;
      case 'cliente':
        return admin.badge.cliente;
      default:
        return admin.badge.default;
    }
  };

  const getLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'recepcionista':
        return 'Recepcionista';
      case 'cliente':
        return 'Cliente';
      default:
        return role;
    }
  };

  return (
    <span className={`${admin.badge.base} ${getBadgeClass(rol)}`}>
      {getLabel(rol)}
    </span>
  );
}

