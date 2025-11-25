"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';

const CreateRoomPage = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // Verificar estado de autenticación al cargar
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
    }
    // Si está autenticado pero no es admin, mostrar mensaje de error
    if (!loadingAuth && isLoggedIn && user?.rol !== 'admin') {
      alert('Acceso denegado. Solo los administradores pueden crear habitaciones.');
      router.push('/');
    }
  }, [loadingAuth, isLoggedIn, user, router]);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <CreateRoomForm />
    </div>
  );
};

export default CreateRoomPage;

