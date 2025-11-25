"use client";

import Image from "next/image";
import Link from "next/link";
import { headerLinkBase, headerLinkSeparator } from "@/utils/Tokens";

export default function HeaderComponent() {
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
          <Link href="/" className={`${headerLinkBase} ${headerLinkSeparator}`}>Inicio</Link>
          <Link href="/reservas" className={`${headerLinkBase} ${headerLinkSeparator}`}>Reservas</Link>
          <Link href="/servicios" className={`${headerLinkBase} ${headerLinkSeparator}`}>Servicios</Link>
          <Link href="/restaurante-bar" className={`${headerLinkBase} ${headerLinkSeparator}`}>Restaurante &amp; Bar</Link>
          <Link href="/politicas" className={headerLinkBase}>Políticas y reglas</Link>
        </nav>
      </div>
    </header>
  );
}