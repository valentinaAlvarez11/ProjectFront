// components/UserNav.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; 

export function UserNav() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/'); 
  };

  return (
    <div className="flex items-center space-x-4 ml-8">
      {isLoggedIn ? (
        <>
          <span className="text-white text-sm">
            Hola, {user?.nombre} "{user?.rol}"
          </span>
          
          {(user?.rol === 'admin' || user?.rol === 'recepcionista') && (
            <Link href="/admin/dashboard" className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Dashboard
            </Link>
          )}
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <>
          <Link 
            href="/login" 
            className="px-4 py-2 text-sm text-white border border-white rounded hover:bg-white hover:text-[#0a1445] transition"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 text-sm bg-[#b6a253] text-[#0a1445] rounded hover:bg-[#c0ac66] transition"
          >
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
}