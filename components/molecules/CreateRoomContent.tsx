"use client";

import React from 'react';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';
import ErrorModal from '@/components/molecules/ErrorModal';
import { UseModalReturn } from '@/hooks/useModal';

interface CreateRoomContentProps {
  loadingAuth: boolean;
  isLoggedIn: boolean;
  user: { rol: string } | null;
  errorModal: UseModalReturn;
  errorMessage: string;
}

const CreateRoomContent: React.FC<CreateRoomContentProps> = ({
  loadingAuth,
  isLoggedIn,
  user,
  errorModal,
  errorMessage,
}) => {
  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a1445] mx-auto"></div>
          <p className="mt-4 text-[#0a1445] font-semibold">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado o no es admin, no mostrar el formulario
  if (!isLoggedIn || user?.rol !== 'admin') {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <CreateRoomForm />
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
};

export default CreateRoomContent;

