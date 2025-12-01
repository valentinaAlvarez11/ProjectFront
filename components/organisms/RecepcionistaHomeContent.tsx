// components/organisms/RecepcionistaHomeContent.tsx
"use client";

import React from 'react';
import RecepcionistaHome from '@/components/organisms/RecepcionistaHome';
import ErrorModal from '@/components/molecules/ErrorModal';
import AuthLoadingState from '@/components/atoms/AuthLoadingState';
import { useRecepcionista } from '@/hooks/useRecepcionista';

export default function RecepcionistaHomeContent() {
  const { loadingAuth, canAccess, errorModal, errorMessage } = useRecepcionista();

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return <AuthLoadingState message="Verificando autenticación..." />;
  }

  // Si no está autenticado o no es recepcionista, no mostrar el contenido
  if (!canAccess) {
    return null;
  }

  return (
    <>
      <RecepcionistaHome />

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

