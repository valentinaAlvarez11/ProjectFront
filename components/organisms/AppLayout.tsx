"use client";

import React from 'react';
import HeaderComponent from './HeaderComponent';
import { AuthInitializer } from './AuthInitializer';
import FooterBooking from './FooterBooking';

interface AppLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

/**
 * Componente Layout reutilizable que siempre incluye el header
 * Asegura que el header nunca desaparezca de ninguna pantalla
 */
export default function AppLayout({ 
  children, 
  showFooter = true,
  className = ''
}: AppLayoutProps) {
  return (
    <AuthInitializer>
      {/* Header siempre visible con z-index muy alto */}
      <div className="sticky top-0 z-[9999] w-full">
        <HeaderComponent />
      </div>
      <main className={`min-h-screen ${className}`}>
        {children}
      </main>
      {showFooter && <FooterBooking />}
    </AuthInitializer>
  );
}

