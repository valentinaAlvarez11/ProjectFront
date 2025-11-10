"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "../atoms/NavLink";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/reservas", label: "Reservas" },
  { href: "/servicios", label: "Servicios" },
  { href: "/restaurante-bar", label: "Restaurante & Bar" },
  { href: "/politicas", label: "Políticas y reglas" },
];

export default function HeaderComponent() {
  const pathname = usePathname();
  
  return (
    <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253]">
      <div className="flex items-center max-w-[1400px] mx-auto px-8 py-6">
        {/* Logo y texto */}
        <div className="flex items-center min-w-[120px]">
          <Image src="https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_185,y_232,w_649,h_602/fill/w_222,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO-SIN-FONDO.png" alt="Hotel Regatta Cartagena" width={90} height={80} />
        </div>
        <nav className="flex items-center flex-1 justify-center">
          {navItems.map((item, index) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
              className={index === navItems.length - 1 ? "border-r-0" : ""}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
