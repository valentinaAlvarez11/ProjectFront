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

  // Opcional: Mostrar un loader mientras se verifica la sesión inicial
  // Esto previene que el contenido se muestre sin protección o con datos incorrectos
  if (loadingAuth) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <p className="text-xl font-semibold text-[#0a1445]">Verificando sesión...</p>
        </div>
    );
  }

  // Una vez verificado, renderizar la aplicación
  return <>{children}</>;
}