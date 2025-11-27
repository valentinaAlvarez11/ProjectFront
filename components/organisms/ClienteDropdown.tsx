// components/organisms/ClienteDropdown.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens"; 

/**
 * Componente reutilizable para el menú desplegable de clientes
 * Sigue el mismo patrón y diseño que AdminDropdown
 */
export function ClienteDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    // Opciones del menú para clientes
    const getClienteOptions = () => {
        return [
            { name: "Mis Reservas", href: "/mis-reservas" },
            { name: "Nueva Reserva", href: "/nueva-reserva" },
        ];
    };
    
    const navTitle = "Reservas";

    return (
        <div className="relative">
            {/* Botón en la barra de navegación */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 text-white hover:text-[#b6a253] focus:outline-none ${headerLinkBase} ${headerLinkSeparator}`}
                aria-label="Menú de reservas"
            >
                {navTitle}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {getClienteOptions().map((option) => (
                        <Link 
                            key={option.name} 
                            href={option.href} 
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            {option.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

