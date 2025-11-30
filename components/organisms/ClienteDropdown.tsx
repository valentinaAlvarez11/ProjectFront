// components/organisms/ClienteDropdown.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens"; 

/**
 * Componente reutilizable para el menú desplegable de clientes
 * El botón "Reservas" navega directamente al formulario de reservas
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
            {/* Botón en la barra de navegación - Navega directamente al formulario de reservas */}
            <Link
                href="/reservas"
                className={`p-4 text-white hover:text-[#b6a253] focus:outline-none ${headerLinkBase} ${headerLinkSeparator}`}
                aria-label="Formulario de reservas"
            >
                {navTitle}
            </Link>

            {/* Dropdown Menu - Se muestra al hacer hover o click en el icono de flecha (opcional) */}
            {/* Si quieres mantener el dropdown, puedes agregar un icono de flecha junto al enlace */}
        </div>
    );
}

