// components/organisms/HeaderComponent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens";
import { UserNav } from "@/components/organisms/UserNav"; 

export default function HeaderComponent() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const loadingAuth = useAuthStore((state) => state.loadingAuth);
  
  const allLinks = [
    { name: 'Inicio', href: '/', requiredAuth: 'none' },
    { name: 'Reservas', href: '/reservas', requiredAuth: 'logged' },
    { name: 'Servicios', href: '/servicios', requiredAuth: 'none' },
    { name: 'Restaurante & Bar', href: '/restaurante-bar', requiredAuth: 'none' },
    { name: 'Políticas y reglas', href: '/politicas', requiredAuth: 'logged' }, 
  ];

  const filteredLinks = allLinks.filter(link => 
    link.requiredAuth === 'none' || (link.requiredAuth === 'logged' && isLoggedIn)
  );

  if (loadingAuth) {
    return (
      <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253]">
        <div className="flex items-center max-w-[1400px] mx-auto px-8 py-6">
          <div className="text-white">Cargando sesión...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253]">
      <div className="flex items-center max-w-[1400px] mx-auto px-8 py-6">
        <div className="flex items-center min-w-[120px]">
          <Image
            src="https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_185,y_232,w_649,h_602/fill/w_222,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO-SIN-FONDO.png"
            alt="Hotel Regatta Cartagena"
            width={90}
            height={80}
            priority
          />
        </div>
        
        <nav className="flex items-center flex-1 justify-center">
          {filteredLinks.map((link, index) => {
            const isLast = index === filteredLinks.length - 1;
            const className = isLast ? headerLinkBase : `${headerLinkBase} ${headerLinkSeparator}`;

            return (
              <Link key={link.name} href={link.href} className={className}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <UserNav /> 
      </div>
    </header>
  );
}