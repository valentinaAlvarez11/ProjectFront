// components/organisms/AdminDropdown.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens"; 

interface AdminDropdownProps {
    rol: 'admin' | 'recepcionista';
}

export function AdminDropdown({ rol }: AdminDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Opciones basadas en el Mock-Up (Usuarios, Habitaciones, Reservas)
    const getAdminOptions = () => {
        const baseOptions = [
            { name: "Reservas", href: "/admin/reservations" }, // Asume la ruta de gestión
        ];

        if (rol === 'admin') {
            return [
                { name: "Usuarios", href: "/admin/users" },
                { name: "Habitaciones", href: "/admin/rooms" },
                ...baseOptions
            ];
        }
        // Opciones para Recepcionista
        return [
             { name: "Servicios", href: "/servicios" }, // Opcional, o la ruta de gestión de servicios si existe
             ...baseOptions
        ]; 
    };
    
    // Título del enlace en la barra de navegación
    const navTitle = "Gestión"; 

    return (
        <div className="relative">
            {/* Botón en la barra de navegación */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 text-white hover:text-[#b6a253] focus:outline-none ${headerLinkBase} ${headerLinkSeparator}`}
            >
                {navTitle}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {getAdminOptions().map((option) => (
                        <Link 
                            key={option.name} 
                            href={option.href} 
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {option.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}