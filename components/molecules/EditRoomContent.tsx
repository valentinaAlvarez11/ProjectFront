"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { IRoom } from '@/interfaces/rooms';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';
import ErrorModal from '@/components/molecules/ErrorModal';
import { UseModalReturn } from '@/hooks/useModal';

interface EditRoomContentProps {
  room: IRoom | null;
  loading: boolean;
  error: string;
  loadingAuth: boolean;
  isLoggedIn: boolean;
  user: { rol: string } | null;
  errorModal: UseModalReturn;
  errorModalMessage: string;
  onSuccess: () => void;
}

const EditRoomContent: React.FC<EditRoomContentProps> = ({
  room,
  loading,
  error,
  loadingAuth,
  isLoggedIn,
  user,
  errorModal,
  errorModalMessage,
  onSuccess,
}) => {
  const router = useRouter();

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

  // Si no está autenticado o no es admin, no mostrar nada
  if (!isLoggedIn || user?.rol !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a1445] mx-auto"></div>
          <p className="mt-4 text-[#0a1445] font-semibold">Cargando habitación...</p>
        </div>
      )}
      {!loading && room && (
        <CreateRoomForm 
          initialData={room} 
          isEditing={true}
          onSuccess={onSuccess}
        />
      )}
      {!loading && !room && error && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6">
          <div className="text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-red-700 font-semibold">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 bg-[#0a1445] hover:bg-[#222a54] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-[#b6a253]"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Acceso Denegado"
        message={errorModalMessage}
      />
    </div>
  );
};

export default EditRoomContent;

