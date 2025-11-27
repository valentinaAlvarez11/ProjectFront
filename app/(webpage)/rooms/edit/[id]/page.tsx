"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IRoom } from '@/interfaces/rooms';
import RoomsService from '@/libs/rooms.service';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';
import ErrorModal from '@/components/molecules/ErrorModal';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';

const EditRoomPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;
  const [room, setRoom] = useState<IRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Verificar autenticación y permisos
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin') {
      setErrorModalMessage('Acceso denegado. Solo los administradores pueden editar habitaciones.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
      return;
    }
  }, [loadingAuth, isLoggedIn, user, router]);

  useEffect(() => {
    if (id === null || isNaN(id)) {
      setLoading(false);
      setError("ID de habitación no válido.");
      return;
    }

    if (!isLoggedIn || user?.rol !== 'admin') {
      return;
    }

    setLoading(true);
    setError("");

    const fetchRoom = async (roomId: number): Promise<{ habitacion: IRoom }> => {
      try {
        const response = await RoomsService.getByIdPublic(roomId);
        return response;
      } catch (err: any) {
        if (err.status === 404) {
          throw new Error("Habitación no encontrada.");
        }
        throw err;
      }
    };

    fetchRoom(id)
      .then(response => {
        setRoom(response.habitacion);
        setError("");
      })
      .catch(err => {
        console.error("Error al cargar la habitación:", err);
        setRoom(null);
        const msg = err.message || "Error de conexión con el servidor.";
        setError(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, isLoggedIn, user]);

  const handleSuccess = () => {
    // Redirigir a la página de detalles de la habitación después de editar
    router.push(`/room/${id}`);
  };

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
          onSuccess={handleSuccess}
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

export default EditRoomPage;

