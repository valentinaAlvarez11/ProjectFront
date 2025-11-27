"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ErrorModal from '@/components/molecules/ErrorModal';
import AuthLoadingState from '@/components/atoms/AuthLoadingState';
import AdminPageHeader from '@/components/molecules/AdminPageHeader';
import { useModal } from '@/hooks/useModal';
import { adminPage } from '@/utils/Tokens';

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * Layout reutilizable para páginas admin
 * Maneja autenticación, loading states, y estructura común
 * Usa tokens de diseño y es responsive
 */
export default function AdminPageLayout({ 
  title, 
  subtitle, 
  children,
  requireAdmin = true 
}: AdminPageLayoutProps) {
  const router = useRouter();
  const { isLoggedIn, user, loadingAuth, checkAuthStatus } = useAuthStore();
  const errorModal = useModal();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!loadingAuth && !isLoggedIn) {
      router.push('/login');
    }
    if (requireAdmin && !loadingAuth && isLoggedIn && user?.rol !== 'admin') {
      setErrorMessage('Acceso denegado. Solo los administradores pueden acceder a esta página.');
      errorModal.open();
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [loadingAuth, isLoggedIn, user, router, errorModal, requireAdmin]);

  if (loadingAuth) {
    return <AuthLoadingState />;
  }

  if (!isLoggedIn || (requireAdmin && user?.rol !== 'admin')) {
    return null;
  }

  return (
    <>
      <div className={adminPage.container}>
        <div className={adminPage.contentWrapper}>
          <AdminPageHeader title={title} subtitle={subtitle} />
          
          <div className={adminPage.cardContainer}>
            {children}
          </div>
        </div>
      </div>

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        title="Acceso Denegado"
        message={errorMessage}
      />
    </>
  );
}

