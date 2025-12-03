"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IRoom } from '@/interfaces/rooms';
import RoomsService from '@/libs/rooms.service';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';

export const useEditRoom = (id: number | null) => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorModalMessage, setErrorModalMessage] = useState('');
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
  }, [loadingAuth, isLoggedIn, user, router, errorModal]);

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

  return {
    room,
    loading,
    error,
    loadingAuth,
    isLoggedIn,
    user,
    errorModal,
    errorModalMessage,
    handleSuccess,
  };
};

