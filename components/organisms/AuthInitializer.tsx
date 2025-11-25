// components/AuthInitializer.tsx
"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// Este componente solo se encarga de iniciar la verificación
export default function AuthInitializer() {
    const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
    
    useEffect(() => {
        checkAuthStatus();
        // Solo se ejecuta una vez al montar la aplicación
    }, [checkAuthStatus]); 

    // Este componente no renderiza nada visible
    return null;
}