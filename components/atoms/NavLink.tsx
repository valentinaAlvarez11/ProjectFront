import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export default function NavLink({ 
  href, 
  children, 
  isActive = false,
  className = "" 
}: NavLinkProps) {
  const baseStyles = "text-lg font-light px-10 border-r border-[#222a54] h-[60px] flex items-center transition-colors";
  const activeStyles = isActive ? "text-[#b6a253]" : "text-white hover:text-[#b6a253]";
  
  return (
    <Link 
      href={href} 
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      {children}
    </Link>
  );
}

