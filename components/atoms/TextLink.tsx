"use client";

import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TextLink({ href, children, className = "" }: TextLinkProps) {
  return (
    <Link 
      href={href}
      className={`text-gray-400 hover:text-gray-600 text-sm transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

