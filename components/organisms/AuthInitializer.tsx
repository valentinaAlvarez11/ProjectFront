// components/utils/AuthInitializer.tsx
'use client'; 
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore'; 

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // Cargar la sesión desde la cookie al montar la app
    checkAuthStatus();
  }, [checkAuthStatus]); 

  // Una vez verificado, renderizar la aplicación
  return <>{children}</>;
}