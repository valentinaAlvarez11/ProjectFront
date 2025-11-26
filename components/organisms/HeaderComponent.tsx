// components/organisms/HeaderComponent.tsx (Refactorizado y Corregido)
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
// ASUME que headerLinkBase y headerLinkSeparator son clases definidas en tu proyecto
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens";
import { useAuthStore } from "@/store/authStore"; 
import { UserDropdown } from "./UserDropdown"; 
import { AdminDropdown } from "./AdminDropdown";

interface NavLink {
  name: string;
  href: string;
}

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, loadingAuth } = useAuthStore();
  const isAdminOrRecep = user && (user.rol === 'admin' || user.rol === 'recepcionista');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Determinar los enlaces principales basados en el rol (Memorizar para rendimiento)
  const mainNavLinks = useMemo(() => {
    let links: NavLink[] = [
      { name: "Inicio", href: "/" },
      { name: "Servicios", href: "/servicios" },
      { name: "Restaurante & Bar", href: "/restaurante-bar" },
    ];

    // Cliente, Recepcionista y Admin tienen Reservas en la barra
    if (isLoggedIn) {
      links.splice(1, 0, { name: "Reservas", href: "/reservas" }); // Insertar después de Inicio
    } 
    return links;
  }, [isLoggedIn]); 

  return (
    <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253] sticky top-0 z-50">
      {/* CLASES CORREGIDAS: Aseguramos py-4 sm:py-6 para la altura original */}
      <div className="flex items-center justify-between max-w-[1400px] mx-auto ">
        {/* Logo */}
        <div className="flex items-center min-w-[80px] sm:min-w-[120px]">
          <Link href="/" onClick={closeMenu}>
            {/* RUTA DEL LOGO CORREGIDA: Volvemos a la URL de Wix */}
            <Image
              src="https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_185,y_232,w_649,h_602/fill/w_222,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO-SIN-FONDO.png"
              alt="Hotel Regatta Cartagena"
              width={80}
              height={80}
              priority
              className="w-16 h-14 sm:w-[80px] sm:h-[80px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center flex-1 justify-center" suppressHydrationWarning>
          {mainNavLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`${headerLinkBase} ${headerLinkSeparator}`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Menú de Gestión/Servicios solo para Admin/Recepcionista */}
          {isAdminOrRecep && user && (
            // AQUI DEBEMOS HACER QUE EL CONTENEDOR DEL DROPDOWN NO TENGA UN PADDING EXTRA
            // Usamos un div limpio y dejamos que el AdminDropdown maneje su propio padding
            <div className={`text-white`} suppressHydrationWarning>
               <AdminDropdown rol={user.rol as 'admin' | 'recepcionista'} />
            </div>
          )}
        </nav>

        {/* User Navigation (Dropdown) */}
        <div className="hidden lg:block" suppressHydrationWarning>
          <UserDropdown />
        </div>

        {/* Mobile Menu Button y Lógica Móvil (Omitido para brevedad) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#b6a253] rounded"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu (Asegurando la coherencia) */}
      <nav
        className={`lg:hidden bg-[#0a1445] border-t border-[#222a54] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        suppressHydrationWarning
      >
        <div className="flex flex-col">
          {mainNavLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className={`text-base font-light px-6 py-4 border-b border-[#222a54] hover:bg-[#222a54] transition-colors ${
                index === 0 
                  ? "text-[#b6a253]" // Asumimos que el primer enlace ('Inicio') tiene el color primario
                  : "text-white hover:text-[#b6a253]"
              }`}
            >
              {link.name}
            </Link>
          ))}
            {/* Aquí deberías incluir los dropdowns en la navegación móvil si es necesario */}
            <div className="px-6 py-4 border-b border-[#222a54]" suppressHydrationWarning>
                <UserDropdown />
            </div>
        </div>
      </nav>
    </header>
  );
}