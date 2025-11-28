// components/organisms/AdminDashboardContent.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/organisms/AdminDashboard';
import ErrorModal from '@/components/molecules/ErrorModal';
import AuthLoadingState from '@/components/atoms/AuthLoadingState';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { adminPage } from '@/utils/Tokens';

export default function AdminDashboardContent() {
  const { loadingAuth, canAccess, errorModal, errorMessage } = useAdminDashboard();

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return <AuthLoadingState message="Verificando autenticación..." />;
  }

  // Si no está autenticado o no es admin, no mostrar el contenido
  if (!canAccess) {
    return null;
  }

  return (
    <>
      <div className={adminPage.container}>
        <AdminDashboard />
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Acceso Denegado"
        message={errorMessage}
      />
    </>
  );
}

