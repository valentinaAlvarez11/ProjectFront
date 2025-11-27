"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AdminDashboard from '@/components/organisms/AdminDashboard';
import ErrorModal from '@/components/molecules/ErrorModal';
import { useModal } from '@/hooks/useModal';

const AdminDashboardPage = () => {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('Acceso denegado. Solo los administradores pueden acceder a esta página.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [loadingAuth, isLoggedIn, user, router, errorModal]);

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a174e] mx-auto"></div>
          <p className="mt-4 text-[#0a174e] font-semibold">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado o no es admin, no mostrar el contenido
  if (!isLoggedIn || user?.rol !== 'admin') {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
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
};

export default AdminDashboardPage;

