// components/organisms/UserDropdown.tsx
'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; 
import { useState } from "react";
// ASUME que has instalado react-icons: npm install react-icons
import { FaUserCircle } from "react-icons/fa"; 

export function UserDropdown() {
    const { isLoggedIn, user, logout } = useAuthStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        router.push('/'); 
    };
    
    // Opciones del dropdown del perfil según el Mock-Up
    const getDropdownOptions = () => {
        if (isLoggedIn) {
            // Si es admin o recepcionista, mostrar registros de todos los clientes
            // Si es cliente, mostrar sus propios registros
            const registrosHref = (user?.rol === 'admin' || user?.rol === 'recepcionista') 
                ? "/admin/registros" 
                : "/registros";
            
            return [
                { name: "Perfil", href: "/perfil" },
                { name: "Registros", href: registrosHref },
                { name: "Log Out", action: handleLogout, isButton: true },
            ];
        } else {
            return [
                { name: "Register", href: "/register" },
                { name: "Log In", href: "/login" },
            ];
        }
    };

    return (
        <div className="relative">
            {/* Botón/Icono del perfil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white hover:text-[#b6a253] focus:outline-none"
                aria-label="Menú de usuario"
            >
                <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50"
                    onMouseLeave={() => setIsOpen(false)} 
                >
                    {getDropdownOptions().map((option) => (
                        <div key={option.name}>
                            {option.isButton ? (
                                <button 
                                    onClick={option.action}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {option.name}
                                </button>
                            ) : (
                                // **SOLUCIÓN AQUÍ:** Agregamos la verificación (option.href &&)
                                option.href && (
                                    <Link 
                                        href={option.href} 
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {option.name}
                                    </Link>
                                )
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}