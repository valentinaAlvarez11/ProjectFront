// components/organisms/HeaderComponent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react"; 
import { usePathname } from "next/navigation"; 
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
  const [isScrolled, setIsScrolled] = useState(false); 
  
  const pathname = usePathname(); 
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const loadingAuth = useAuthStore((state) => state.loadingAuth);

  const isAdminOrRecep = user && (user.rol === 'admin' || user.rol === 'recepcionista');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
        const scrollThreshold = 80; 
        const currentScroll = window.scrollY;
        const scrolled = currentScroll > scrollThreshold;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    };
    handleScroll(); 
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const mainNavLinks = useMemo(() => {
    let links: NavLink[] = [
      { name: "Inicio", href: "/" },
      { name: "Servicios", href: "/servicios" },
      { name: "Restaurante & Bar", href: "/restaurante-bar" },
    ];
    // Aquí puedes añadir condicionalmente los enlaces de 'Reservas' o 'Políticas'
    // si quieres que también tengan el color activo
    
    // Ejemplo: Si está logueado, se añade el enlace de Reservas
    if (isLoggedIn) {
        links.splice(1, 0, { name: "Reservas", href: "/reservas" });
    }
    
    return links;
  }, []); 

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
          {mainNavLinks.map((link, index) => {
            // 🔑 DETERMINAR SI LA RUTA ES ACTIVA
            // Compara si la ruta del enlace coincide exactamente con la ruta actual.
            // Para 'Inicio' ('/'), a veces necesitamos ser menos estrictos si la URL es solo '/'.
            const isActive = pathname === link.href || 
                             (link.href === '/' && pathname === '/');
            
            // 🔑 CLASES CONDICIONALES
            const activeClass = isActive 
                                ? "text-[#b6a253] font-semibold" // Color dorado si está activo
                                : "text-white hover:text-[#b6a253]"; // Blanco y hover dorado si no está activo

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                // Concatenamos las clases base, el separador y la clase activa/inactiva
                className={`${headerLinkBase} ${headerLinkSeparator} ${activeClass} ${isScrolled ? 'text-sm' : 'text-base'}`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Menú de Gestión/Servicios solo para Admin/Recepcionista */}
          {isAdminOrRecep && user && (
            <div className={`text-white`} suppressHydrationWarning>
               <AdminDropdown rol={user.rol as 'admin' | 'recepcionista'} />
            </div>
          )}
        </nav>

        {/* User Navigation (Dropdown) */}
        <div className="hidden lg:flex items-center gap-4" suppressHydrationWarning>
          {/* 🔑 NUEVA LÓGICA: Saludo al usuario logueado */}
          {isLoggedIn && user?.nombre && (
            <span className="text-white text-base font-light whitespace-nowrap">
              Hola, {user.nombre}
            </span>
          )}
          
          <UserDropdown />
        </div>

        {/* Mobile Menu Button y Lógica Móvil (Omitido) */}
        {/* ... (código móvil) ... */}
        
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
          {mainNavLinks.map((link, index) => {
            const isActive = pathname === link.href || (link.href === '/' && pathname === '/');
            const activeMobileClass = isActive ? "text-[#b6a253] font-semibold" : "text-white hover:text-[#b6a253]";
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`text-base font-light px-6 py-4 border-b border-[#222a54] hover:bg-[#222a54] transition-colors ${activeMobileClass}`}
              >
                {link.name}
              </Link>
            );
          })}
            <div className="px-6 py-4 border-b border-[#222a54]" suppressHydrationWarning>
                <UserDropdown />
            </div>
        </div>
      </nav>
    </header>
  );
}