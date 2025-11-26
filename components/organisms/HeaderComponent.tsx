// components/organisms/HeaderComponent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens";
import { UserNav } from "@/components/organisms/UserNav"; 

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Inicio", href: "/" },
  { name: "Reservas", href: "/reservas" },
  { name: "Servicios", href: "/servicios" },
  { name: "Restaurante & Bar", href: "/restaurante-bar" },
];

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253] sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo */}
        <div className="flex items-center min-w-[80px] sm:min-w-[120px]">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_185,y_232,w_649,h_602/fill/w_222,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO-SIN-FONDO.png"
              alt="Hotel Regatta Cartagena"
              width={90}
              height={80}
              priority
              className="w-16 h-14 sm:w-[90px] sm:h-[80px]"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center flex-1 justify-center">
          {navLinks.map((link, index) => {
            const isLast = index === navLinks.length - 1;
            const className = isLast ? headerLinkBase : `${headerLinkBase} ${headerLinkSeparator}`;

            return (
              <Link key={link.name} href={link.href} className={className}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Navigation */}
        <div className="hidden lg:block">
          <UserNav />
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation Menu */}
      <nav
        className={`lg:hidden bg-[#0a1445] border-t border-[#222a54] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className={`text-base font-light px-6 py-4 border-b border-[#222a54] hover:bg-[#222a54] transition-colors ${
                index === 0 
                  ? "text-[#b6a253]" 
                  : "text-white hover:text-[#b6a253]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-6 py-4 border-b border-[#222a54]">
            <UserNav />
          </div>
        </div>
      </nav>
    </header>
  );
}