// components/utils/AuthInitializer.tsx
'use client'; 
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore'; 
import { usePathname } from 'next/navigation';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { checkAuthStatus, loadingAuth } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    // Cargar la sesión desde la cookie al montar la app
    checkAuthStatus();
  }, [checkAuthStatus]); 

  // Una vez verificado, renderizar la aplicación
  return <>{children}</>;
}