"use client";

import React from 'react';
import { adminPage } from '@/utils/Tokens';

interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Componente reutilizable para headers de páginas admin
 * Usa tokens de diseño y es responsive
 */
export default function AdminPageHeader({ title, subtitle }: AdminPageHeaderProps) {
  return (
    <div className={adminPage.headerContainer}>
      <div className={adminPage.headerContent}>
        <h1 className={adminPage.headerTitle}>
          {title}
        </h1>
        <p className={adminPage.headerSubtitle}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

